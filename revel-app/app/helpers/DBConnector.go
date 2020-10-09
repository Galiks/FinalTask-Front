package helpers

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/revel/revel"
)

//ErrFailedConnection ошибка при неудачном подключении к БД
var (
	ErrFailedConnection = errors.New("Не удалось связаться с базой данных")
)

//IDBConnector интерфейс для работ с базой данных
type IDBConnector interface {
	GetDBConnection() (*sql.DB, error)
}

//Поле для Singlton
var connector *dbConnector

//GetConnector метод для реализации Singleton
func GetConnector() (IDBConnector, error) {
	if connector == nil {
		connector = new(dbConnector)
	}

	return connector, nil
}

type dbConnector struct{}

func (connector *dbConnector) GetDBConnection() (db *sql.DB, err error) {
	if name, ok := revel.Config.String("db.name"); !ok {
		err = ErrFailedConnection
		revel.AppLog.Errorf("Не удалось получить имя БД")
		return
	}
	if address, ok := revel.Config.String("db.address"); !ok {
		err = ErrFailedConnection
		revel.AppLog.Errorf("Не удалось получить адрес БД")
		return
	}
	if user, ok := revel.Config.String("dbuser"); !ok {
		err = ErrFailedConnection
		revel.AppLog.Errorf("Не удалось получить пользователя БД")
		return
	}
	if password, ok := revel.Config.String("db.password"); !ok {
		err = ErrFailedConnection
		revel.AppLog.Errorf("Не удалось получить пароль БД")
		return
	}

	connStr := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=verify-full", user, password, address, name)

	db, err = sql.Open("postgres", connStr)
	if err != nil {
		revel.AppLog.Errorf("Не удалось подключиться к БД")
	}

	return
}

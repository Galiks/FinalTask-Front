package mappers

import (
	"database/sql"
	"revel-app/app/models/entities"
)

//MEvent маппер мероприятий
type MEvent struct {
	db *sql.DB
}

//SelectAll получение всех мероприятий
func (m *MEvent) SelectAll() (e []*entities.Event, err error) {
	return
}

//SelectByID получение мероприятия по ID
func (m *MEvent) SelectByID(ID int64) (e *entities.Event, err error) {
	return
}

//Insert добавление мероприятия
func (m *MEvent) Insert(event entities.Event) (e *entities.Event, err error) {
	return
}

//Update изменение мероприятия
func (m *MEvent) Update(event entities.Event) (e *entities.Event, err error) {
	return
}

//Delete удаление мероприятия
func (m *MEvent) Delete(ID int64) (err error) {
	return
}

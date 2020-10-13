package mappers

import (
	"database/sql"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"
	"time"
)

//MEvent маппер мероприятий
type MEvent struct {
	db *sql.DB
}

//SelectAll получение всех мероприятий
func (m *MEvent) SelectAll() (e []entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}
	db.Query("SELECT * FROM Event")
	// this.events = new Map()
	//     this.events.set(1, new Event(1, "StandUp", new Date(), EVENT_STATUS.planned))
	//     this.events.set(2, new Event(2, "Собеседование", new Date(), EVENT_STATUS.planned))
	events := make(map[int]entities.Event)
	events[1] = entities.Event{ID: 1, Theme: "HELLO", Beginning: time.Now(), Status: "HELLO"}

	result := make([]entities.Event, 1)
	result = append(result, entities.Event{ID: 1, Theme: "HELLO", Beginning: time.Now(), Status: "HELLO"})

	return result, nil
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

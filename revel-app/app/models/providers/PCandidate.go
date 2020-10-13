package providers

import (
	"database/sql"
	"revel-app/app/models/entities"
	"revel-app/app/models/mappers"
)

//PCandidate провайдер контроллера кандидата
type PCandidate struct {
	candidateMapper *mappers.MCandidate
}

//Init метод инициализации провайдера PCandidate
func (p *PCandidate) Init(db *sql.DB) error {
	p.candidateMapper = new(mappers.MCandidate)
	p.candidateMapper.Init(db)
	return nil
}

//GetCandidates метод получения всех кандидатов
func (p *PCandidate) GetCandidates() (cs []*entities.Candidate, err error) {
	return p.candidateMapper.SelectAll()
}

//GetCandidateByID метод получения кандидата по ID
func (p *PCandidate) GetCandidateByID(ID int64) (c *entities.Candidate, err error) {
	return p.candidateMapper.SelectByID(ID)
}

//GetCandidatesByEventID метод получения кандидатов, связанных с мероприятием
func (p *PCandidate) GetCandidatesByEventID(eventID int64) (cs []*entities.Candidate, err error) {
	return p.candidateMapper.SelectByEventID(eventID)
}

//CreateCandidate метод создаёт кандидата
func (p *PCandidate) CreateCandidate(candidate entities.Candidate) (c *entities.Candidate, err error) {
	return p.candidateMapper.Insert(candidate)
}

//CreateLinkToEvent связывание кандидата и мероприятия
func (p *PCandidate) CreateLinkToEvent(IDcandidate int64, IDevent int64) (err error) {
	return p.candidateMapper.InsertCandidateToEvent(IDcandidate, IDevent)
}

//UpdateCandidate метод изменения кандидата
func (p *PCandidate) UpdateCandidate(candidate entities.Candidate) (c *entities.Candidate, err error) {
	return p.candidateMapper.Update(candidate)
}

//DeleteCandidate метод удаляет кандидата
func (p *PCandidate) DeleteCandidate(ID int64) (err error) {
	return p.candidateMapper.Delete(ID)
}

//DeleteCandidatesFromEvent удаляет всех кандидатов из мероприятия
func (p *PCandidate) DeleteCandidatesFromEvent(IDEvent int64) (err error) {
	return p.candidateMapper.DeleteCandidatesFromEvent(IDEvent)
}

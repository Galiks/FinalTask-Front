package controllers

import (
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"

	"github.com/revel/revel"
)

//CCandidate контроллер для кандидатов
type CCandidate struct {
	*revel.Controller
	candidateProvider *providers.PCandidate
}

//Before интерцептор BEFOR контроллера CCandidate
func (controller *CCandidate) Before() (result revel.Result, rc CCandidate) {
	return nil, *controller
}

//After интерцептор AFTER контроллера CCandidate
func (controller *CCandidate) After() (result revel.Result, rc CCandidate) {
	return nil, *controller
}

//GetCandidates метод получения всех кандидатов
func (controller *CCandidate) GetCandidates() revel.Result {
	//var Candidates []*entities.Candidate = controller.CandidateProvider.GetCandidates()

	return nil
}

//GetCandidateByID метод получения кандидатов по ID
func (controller *CCandidate) GetCandidateByID() revel.Result {

	return nil
}

//CreateCandidate метод создания кандидатов
func (controller *CCandidate) CreateCandidate() revel.Result {
	return nil
}

//UpdateCandidate метод изменения кандидатов
func (controller *CCandidate) UpdateCandidate() revel.Result {
	return nil
}

//DeleteCandidate метод удаления кандидатов
func (controller *CCandidate) DeleteCandidate() revel.Result {
	return nil
}

func (controller *CCandidate) fetchPost() (e entities.Candidate, err error) {
	return
}

package entities

//Candidate структура сущности кандидата
type Candidate struct {
	ID         int64  `json:"ID"`
	Firstname  string `json:"first name"`
	Lastname   string `json:"last name"`
	Patronymic string `json:"patronymic"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Status     string `json:"status"`
	IDUser     int64  `json:"ID user"`
}

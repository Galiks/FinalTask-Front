package controllers

import (
	"github.com/revel/revel"
)

//App начало программы
type App struct {
	*revel.Controller
}

//Index вызов основного html
func (c App) Index() revel.Result {
	return c.Render()
}

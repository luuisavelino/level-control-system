package controllers

func (sc *systemControllerInterface) GetSystems(c *gin.Context) {
	msg, err := sc.service.GetSystems()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		Status: "success", Message: msg,
	})
}
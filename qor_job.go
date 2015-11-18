package worker

import "github.com/jinzhu/gorm"

type QorJobInterface interface {
	GetJobName() string
	SetJobName(string)
	GetStatus() string
	SetStatus(string)
	GetArgument() interface{}
	SetArgument(argument interface{})
	GetJob() *Job
}

type QorJob struct {
	gorm.Model
	Name     string
	Status   string
	Argument interface{} `sql:"size:65536"`
}

func (job *QorJob) GetJobName() string {
	return job.Name
}

func (job *QorJob) SetJobName(name string) {
	job.Name = name
}

func (job *QorJob) GetStatus() string {
	return job.Status
}

func (job *QorJob) SetStatus(status string) {
	job.Status = status
}

func (job *QorJob) GetArgument() interface{} {
	return job.Argument
}

func (job *QorJob) SetArgument(argument interface{}) {
	job.Argument = argument
}

func (job *QorJob) GetJob() *Job {
	return nil
}

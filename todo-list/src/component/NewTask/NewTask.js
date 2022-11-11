import React from 'react'
import './NewTask.css'
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap'
import { useState, useContext, useEffect } from 'react'
import { contextTask } from '../../App'



const NewTask = (props) => {

    const theme = useContext(contextTask)

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const checkJson = window.localStorage.getItem('checked')
        if (checkJson !== null) setChecked(JSON.parse(checkJson))
    }, [])




    useEffect(() => {
      
        window.localStorage.setItem('checked', JSON.stringify(theme.completed))
       


    }, [theme.completed])

    const handelRemoveTask = () => {
        props.onRemove(props.id)
    }
    const handelEditTask = () => {
        props.onEdit(props.id)
    }
    const handelClickChecked = () => {

        props.onClickChecked(props.id)
        theme.setCompleted(!theme.completed)

        


    }

    return (
        <div>

            <Row>
                <Col>
                    <FormGroup className='new_task' check>
                        <div className='title__new_task'>
                            <Input

                                onClick={handelClickChecked}
                                value={props.checked}
                                



                                id="checkbox2"
                                type="checkbox"
                            />


                            {props.title}
                        </div>
                            {props.priority}
                       




                        <div className='btn__new_task'>
                        {props.date} days left
                            <Button onClick={handelEditTask} color="info">
                                Detail
                            </Button>
                            <Button onClick={handelRemoveTask} color="danger">
                                Remove
                            </Button>
                        </div>

                    </FormGroup>
                </Col>
            </Row>

        </div>
    )
}

export default NewTask
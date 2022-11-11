import React from 'react';
import './TodoList.css';
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import NewTask from '../NewTask/NewTask';
import { useState, useContext, useEffect } from 'react';
import { contextTask } from '../../App';
import { v4 as id } from 'uuid';


const Todolist = () => {
    const theme = useContext(contextTask);
    // value task
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Normal');

    // blockUpdate
    const [blockUpdate, setBlockUpdate] = useState(false);

    // value search
    const [searchTask, setSearchTask] = useState('');

    //check
    const [checkedList, setCheckedList] = useState(true);

    // date
    const [dateT, setDateT] = useState(null)
    const [dateT1, setDateT1] = useState(null)




    useEffect(() => {

        const titleJson = window.localStorage.getItem('title');
        const dateJson = window.localStorage.getItem('date');

        if (titleJson !== null) {
            setTodoList(JSON.parse(titleJson))
            setTodoList1(JSON.parse(titleJson))
        };

        if (dateJson !== null) {
            setDateT1(JSON.parse(dateJson))
        };


        // phần sort console được

        const sort = todoList.sort(function (a, b) {
            return a.date - b.date
        })
        console.log('sort:', sort)

    }, [dateT1]);


    useEffect(() => {
        const d = new Date();
        const date = d.getDate()
        setDateT(date)

    }, [dateT])

    const d1 = new Date(dueDate);
    const date1 = d1.getDate()

    const [todoList, setTodoList] = useState([
        {
            id: 1,
            title: "Do homework",
            checked: true,
            description: dateT,
            date: date1,
            priority: 'Normal',
        },


    ]);


    const [todoList1, setTodoList1] = useState([



    ]);

    //add task

    const handelAddNewList = () => {
        if (!title) {
            return
        };
        const newList = {
            id: id(),
            title,
            checked: false,
            description: dateT,
            date: date1,
            priority,
        };
        const newTodoList = [...todoList];

        newTodoList.push(newList);
        setTodoList(newTodoList);

        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('');

        localStorage.setItem('title', JSON.stringify(newTodoList));


        const a = date1 - dateT;
        localStorage.setItem('date', JSON.stringify(a));
    }

    //delete task

    const handelRemoveTask = (id) => {
        const removeList = [...todoList];

        const fillRemove = removeList.filter(item => !(item.id === id));
        setTodoList(fillRemove);
        localStorage.setItem('title', JSON.stringify(fillRemove));
    }

    // edit task
    const [expenUpdate, setExpenUpdate] = useState({});
    const handelEditTask = (id) => {
        const editTask = [...todoList];
        const index = editTask.findIndex(c => c.id === id);

        setTitle(editTask[index].title);
        setDescription(editTask[index].description);
        setDueDate(editTask[index].date);
        setPriority(editTask[index].priority);
        setExpenUpdate(editTask[index])

        setBlockUpdate(!blockUpdate);

        if (blockUpdate === true) {
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('');
        }

    }
    // update task

    const handelUpdateTask = () => {
        const updateTask = [...todoList];
        const index = updateTask.findIndex(c => (c.id === expenUpdate.id));
        updateTask[index].title = title;
        updateTask[index].description = description;
        updateTask[index].date = dueDate;
        updateTask[index].priority = priority;
        setTodoList([...updateTask]);
        localStorage.setItem('title', JSON.stringify(updateTask));
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Normal');
    }
    // search task
    const handelChangeSearchTask = (e) => {
        const searchTaskNew = [...todoList];
        setSearchTask(e.target.value)

        if (!e.target.value) return (setTodoList(todoList1), setSearchTask(''))

        const detailSearch = searchTaskNew.filter(item => (item.title.toLowerCase().includes(e.target.value.toLowerCase())));
        setTodoList(detailSearch)


    }
    const handelClickChecked = (id) => {
        const newTodos = [...todoList];
        for (let i = 0; i < newTodos.length; i++) {
            if (newTodos[i].id === id) {
                newTodos[i].checked = !newTodos[i].checked
            }

        }
        setTodoList([...newTodos])
        // theme.setCompleted(!theme.completed)
        // localStorage.setItem('checked', JSON.stringify(newTodos))
    }

    // check task
    const handelCheckTask = (e) => {
        const checkTaskNew = [...todoList];

        const fillCheck = checkTaskNew.filter(item => item.checked === true)

        if (checkedList === true) {
            setTodoList(fillCheck)
        } else {
            setTodoList(todoList1)

        }





        setCheckedList(!checkedList)




    }




    return (
        <div>
            <div className='todo_list'>
                <Container>
                    <Row className='content_all'>
                        <Input
                            value={title}
                            placeholder='Add new task...'
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    </Row>

                    <Row className='content_all' style={{ marginTop: '2rem' }}>
                        <h5 style={{ paddingLeft: '0' }}>Depcription</h5>
                        <textarea
                            className='textarea_todo_list'
                            rows='4'
                            cols='80'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        ></textarea>
                    </Row>
                    <Row className='content__todo_list'>
                        <Col md={6}>
                            <FormGroup>
                                <h5 style={{ paddingLeft: '0' }}>Due date</h5>

                                <Input
                                    id="exampleDate"
                                    name="date"
                                    placeholder="date placeholder"
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <h5 style={{ paddingLeft: '0' }}>Priority</h5>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value='Normal'>
                                        Normal
                                    </option>
                                    <option value='Low'>
                                        Low
                                    </option>
                                    <option value='High'>
                                        High
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            {blockUpdate && <Button onClick={handelUpdateTask} className='btn__todo_list' color="primary">
                                Update
                            </Button>}
                            <Button onClick={handelAddNewList} className='btn__todo_list' color="success">
                                Add
                            </Button>
                        </Col>

                        <Col>
                            <Input
                                className='btn__todo_list'
                                placeholder='Search task...'
                                value={searchTask}
                                onChange={handelChangeSearchTask}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                c
                                type="checkbox"
                                onClick={handelCheckTask}

                            />
                            <span>Check</span>
                        </Col>
                    </Row>
                    <Row>
                        {todoList.map(item => (

                            <NewTask
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                priority={item.priority}
                                checked={item.checked}
                                onRemove={handelRemoveTask}
                                onClickChecked={handelClickChecked}
                                onEdit={handelEditTask}
                                date={dateT1}

                            />
                        ))}
                    </Row>

                </Container>
            </div>
        </div>
    )
}

export default Todolist
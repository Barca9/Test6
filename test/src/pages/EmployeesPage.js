import React, {Fragment, useEffect, useState} from "react"

export const EmployeesPage = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        fetch("https://reqres.in/api/users?per_page=12")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result.data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])

    function submitHandler(event) {
        event.preventDefault()
        if (value.trim()) {
            onCreateItem(value)
            setValue('')
        }
    }

    function onCreateItem(value) {
        let [firstName, lastName] = value.split(' ');
        setItems(items.concat([{
            first_name: firstName,
            last_name: lastName,
            id: Date.now()
        }]))
    }

    function removeItem(id) {
        setItems(items.filter(item => item.id !== id))
    }

    if (error) {
        return <div>Ошибка:{error.message}</div>
    } else if (!isLoaded) {
        return <div>Загрузка...</div>
    } else {
        return (
            <Fragment>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите имя сотрудника"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                </form>
                <hr/>
                <ul className="list-group">
                    {items.map(item => (
                            <li className="list-group-item list"
                                key={item.id}>
                                {item.first_name} {item.last_name}
                                <button type="button" className="btn btn-outline-danger" onClick={() => removeItem(item.id)}>
                                    Удалить
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </Fragment>
        )
    }
}
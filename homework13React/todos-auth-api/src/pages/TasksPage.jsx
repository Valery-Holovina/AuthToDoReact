import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'

export function Tasks() {
    const { user } = useAuth()

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState('all')
    const [updatingId, setUpdatingId] = useState(null)
    const [updateError, setUpdateError] = useState('')

    useEffect(() => {
        async function loadTasks() {
            try {
                setLoading(true)
                setError('')

                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/todos?userId=${user.id}`
                )

                if (!response.ok) {
                    throw new Error('Failed to load tasks')
                }

                const data = await response.json()
                setTasks(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadTasks()
    }, [user.id])

    async function toggleTask(task) {
        const newCompleted = !task.completed

        try {
            setUpdatingId(task.id)
            setUpdateError('')

            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${task.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: newCompleted
                    })
                }
            )

            if (!response.ok) {
                throw new Error('Failed to update task')
            }

            setTasks((currentTasks) =>
                currentTasks.map((item) =>
                    item.id === task.id
                        ? { ...item, completed: newCompleted }
                        : item
                )
            )
        } catch (error) {
            setUpdateError(error.message)
        } finally {
            setUpdatingId(null)
        }
    }

    const filteredTasks = useMemo(() => {
        if (filter === 'active') {
            return tasks.filter((task) => !task.completed)
        }

        if (filter === 'completed') {
            return tasks.filter((task) => task.completed)
        }

        return tasks
    }, [tasks, filter])

    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const remaining = total - completed

    if (loading) {
        return <p>Loading tasks...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <section>
            <h2>My Tasks</h2>

            <p>
                All: {total} | Done: {completed} | Left: {remaining}
            </p>

            <div>
                <button
                    type="button"
                    onClick={() => setFilter('all')}
                    disabled={filter === 'all'}
                >
                    All
                </button>

                <button
                    type="button"
                    style={{color: "#f3a7a7"}}
                    onClick={() => setFilter('active')}
                    disabled={filter === 'active'}
                >
                    Active
                </button>

                <button
                    type="button"
                    style={{color: "#72dc5d"}}
                    onClick={() => setFilter('completed')}
                    disabled={filter === 'completed'}
                >
                    Done
                </button>
            </div>

            {updateError && (
                <p>Error updating task: {updateError}</p>
            )}

            {filteredTasks.length === 0 ? (
                <p>List is empty</p>
            ) : (
                <ul>
                    {filteredTasks.map((task) => (
                        <li key={task.id}>
                            <span>{task.title}</span>

                            <span>
                                {' — '}
                                {task.completed
                                    ? 'Done'
                                    : 'Active'}
                            </span>

                            <button
                                type="button"
                                style={ task.completed ? {color: "#dc5d5d"} : {color: "#72dc5d"}}
                                onClick={() => toggleTask(task)}
                                disabled={updatingId === task.id}
                            >
                                {updatingId === task.id
                                    ? 'Reload...'
                                    : task.completed
                                        ? 'Mark as active' 
                                        : 'Mark as done'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
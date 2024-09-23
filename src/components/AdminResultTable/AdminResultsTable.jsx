import { useState, useEffect } from "react";
import { Pagination } from "../AdminPagination/AdminPagination"
import style from "./styles.module.scss"
import { USERS_PER_PAGE, BASE_URL, API_TOKEN, START_OF_QUERY, COUNT_OF_RECORDS } from "../../constants";

export const AdminResultsTable = () => {
    const [users, setUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(1);

    // // Get current users
    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        fetch(`${BASE_URL}users?page=${START_OF_QUERY}&size=${COUNT_OF_RECORDS}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': API_TOKEN
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data.content);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });

    }, [])

    return (
        <div className={style.wrapper}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Roles</th>
                        <th>Count <br /> (goods)</th>
                        <th>Last Activity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.roles}</td>
                            <td>{user.goods}</td>
                            <td>{user.lastActivity}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                usersPerPage={USERS_PER_PAGE}
                totalUsers={users.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}
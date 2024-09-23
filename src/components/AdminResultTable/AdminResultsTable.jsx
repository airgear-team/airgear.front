import { useState, useEffect } from "react";
import { Pagination } from "../AdminPagination/AdminPagination"
import style from "./styles.module.scss"
import { usersArray } from "../../constants";

export const AdminResultsTable = () => {
    const [users, setUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);

    // // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        setUsers(usersArray)
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
                            <td>{user.activity}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={usersArray.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}
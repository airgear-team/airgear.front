import { useState, useEffect } from "react";
import { AdminHeader } from "../components/AdminHeader/AdminHeader"
import { AdminResultsTable } from "../components/AdminResultTable/AdminResultsTable"
import { AdminSearch } from "../components/AdminSearch/AdminSearch"
import style from "./styles.module.scss"

export const Admin = () => {
    return (
        <div className={style.admin}>
            <div className={style.container}>
                <AdminHeader />
                <div className={style.content}>
                    <AdminSearch />
                    <AdminResultsTable />
                </div>
            </div >
        </div>

    )
}
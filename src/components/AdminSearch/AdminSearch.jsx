import style from "./styles.module.scss"

export const AdminSearch = () => {
    return (
        <div className={style.search}>
            <form>
                <div className={style.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className={style.input} />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className={style.input} />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" className={style.input} />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" className={style.input}>
                        <option value="">All</option>
                        <option value="verify">Verify</option>
                        <option value="scam">Scam</option>
                        <option value="not_verified">Not Verified</option>
                    </select>
                </div>
                <div className={style.dateWrapper}>
                    <div className={style.formGroup}>
                        <label htmlFor="createdAt">Created At</label>
                        <input type="date" id="createdAt" name="createdAt" className={style.input} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="deletedAt">Delete At</label>
                        <input type="date" id="deletedAt" name="deletedAt" className={style.input} />
                    </div>
                </div>
                <button type="submit" className={style.btn}>Search</button>
            </form>
        </div>
    )
}
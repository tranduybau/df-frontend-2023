import React, {memo} from "react";

import styles from './Pagination.module.css'
import classNames from "classnames";

function Pagination({page, total, onChangePage}) {
  const onRenderPaginationBtn = (i) => {
    console.log(i === page)
    console.log(i >= page - 2)
    console.log(i <= page + 2)
    console.log(i)

    switch (true) {
      case i === page:
      case i >= 1 && i <= 3:
      case i >= total - 2:
      case i >= page - 2 && i <= page + 2:
      case total: {
        return <button key={i} onClick={onChangePage} value={i} className={classNames("ghost", styles.Item)} disabled={page === i}>
          {i}
        </button>
      }

      default: {
        return <span className={styles.Empty} />
      }
    }
  }

  if (total === 0) {
    return null;
  }

  return (
    <div className={styles.Pagination}>
      <button disabled={page === 1} onClick={onChangePage} value={page - 1}>
        Prev
      </button>

      {Array.from({length: Math.ceil(total / 5)}).map((_, i) => (
        onRenderPaginationBtn(i + 1)
      ))}

      <button disabled={page === total} onClick={onChangePage} value={page + 1}>
        Next
      </button>
    </div>
  )
}

export default memo(Pagination);

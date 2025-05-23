import { type LucideProps } from "lucide-react";
import React, { useState } from "react";

interface Action {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  actionFunction: ((row: any) => void) | ((row: any) => Promise<void>);
}

interface Props {
  data: any;
  actions?: Action[];
  ignoreId?: boolean;
}

const ROWS_PER_PAGE = 20;

const Table: React.FC<Props> = ({ data, actions, ignoreId }) => {
  const [page, setPage] = useState(1);

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);

  const paginatedData = data.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {})
              .filter(
                (key) => !(ignoreId && key.toLowerCase().startsWith("id"))
              )
              .map((key) => (
                <th key={key}>{key}</th>
              ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: Record<string, any>, index: number) => (
            <tr key={index + (page - 1) * ROWS_PER_PAGE}>
              {Object.keys(row)
                .filter(
                  (key) => !(ignoreId && key.toLowerCase().startsWith("id"))
                )
                .map((key) => (
                  <td key={key}>{row[key]}</td>
                ))}
              {actions && (
                <td className="actions">
                  {actions.map(({ Icon, actionFunction }, i) => (
                    <Icon key={i} onClick={() => actionFunction(row)} />
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-buttons">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
            style={{
              margin: "0 4px",
              fontWeight: page === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Table;

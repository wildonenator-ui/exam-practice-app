import type { TableData } from "../types/question";

interface Props {
  table: TableData;
}

export default function TableDisplay({ table }: Props) {
  return (
    <div className="my-4 overflow-x-auto">
      {table.title && (
        <p className="text-center font-bold text-base mb-2">{table.title}</p>
      )}
      <table className="border-collapse border border-gray-400 text-sm md:text-base w-full">
        <thead>
          <tr className="bg-blue-100">
            {table.headers.map((h, i) => (
              <th key={i} className="border border-gray-400 px-3 py-2 text-left whitespace-pre-wrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, ci) => (
                <td key={ci} className="border border-gray-400 px-3 py-2 whitespace-pre-wrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

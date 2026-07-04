import { PortableText } from "@portabletext/react";

interface TableProps {
  value: {
    caption?: string;
    hasHeader?: boolean;
    rows: {
      cells: {
        content: any;
        align?: "left" | "center" | "right";
      }[];
    }[];
  };
}

export default function Table({ value }: TableProps) {
  const { caption, hasHeader = true, rows = [] } = value;

  if (!rows.length) return null;

  const headerRow = hasHeader ? rows[0] : null;
  const bodyRows = hasHeader ? rows.slice(1) : rows;

  return (
    <figure className="my-8">
      {caption && (
        <figcaption className="mb-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-sm">
          {headerRow && (
            <thead className="bg-muted">
              <tr>
                {headerRow.cells.map((cell, index) => (
                  <th
                    key={index}
                    className="border px-4 py-3 font-semibold"
                    style={{ textAlign: cell.align || "left" }}
                  >
                    <PortableText value={cell.content} />
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="even:bg-muted/30"
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border px-4 py-3 align-top"
                    style={{ textAlign: cell.align || "left" }}
                  >
                    <PortableText value={cell.content} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
                      }

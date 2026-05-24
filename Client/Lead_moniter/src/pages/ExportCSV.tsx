import { useState } from "react";
import { apiGet } from "../api";
import type { Lead } from "../types";

export default function ExportCSV() {
    const [loading, setLoading] = useState(false);

    const exportCSV = async () => {
        try {
            setLoading(true);
            const response = await apiGet("/leads");
            const result = await response.json();

            // If API returns { data: [...] }
            const data: Lead[] = result.data || result;

            if (!data || data.length === 0) {
              alert("No leads to export");
              setLoading(false);
              return;
            }

            // CSV Headers
            const headers = [
                "Name",
                "Email",
                "Source",
                "Status",
                "Time",
                "Date",
            ];

            // CSV Rows
            const rows = data.map((lead) => [
                `"${lead.name.replace(/"/g, '""')}"`, // escape quotes
                `"${lead.email}"`,
                `"${lead.source}"`,
                `"${lead.status}"`,
                `"${lead.time}"`,
                `"${lead.date}"`,
            ]);

            // CSV Content
            const csvContent = [
                headers.join(","),
                ...rows.map((row) => row.join(",")),
            ].join("\n");

            // Blob
            const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
            });

            // Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.log("CSV Export Error:", error);
            alert("Failed to export CSV");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={exportCSV}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
            >
                {loading ? "Exporting..." : "Export CSV"}
            </button>
        </div>
    );
}
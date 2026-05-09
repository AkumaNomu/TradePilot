"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  CloudUpload,
  FileSpreadsheet,
  Link as LinkIcon,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const files = [
  { name: "salesforce_export_q3.csv", size: "2.4 MB", rows: "12,840", status: "ready", progress: 100 },
  { name: "hubspot_contacts.csv", size: "1.1 MB", rows: "5,612", status: "validating", progress: 72 },
  { name: "shipments_2025.csv", size: "4.8 MB", rows: "18,302", status: "ready", progress: 100 }
];

const checks = [
  { label: "Schema match", status: "ok", value: "94 / 96 fields" },
  { label: "Duplicate rows", status: "warn", value: "182 duplicates" },
  { label: "Missing region", status: "warn", value: "47 records" },
  { label: "Email valid", status: "ok", value: "98.2% valid" },
  { label: "Encoding", status: "ok", value: "UTF-8" },
  { label: "PII flagged", status: "ok", value: "Masked" }
];

const sources = [
  { name: "Salesforce", desc: "Accounts, opportunities, contacts" },
  { name: "HubSpot", desc: "Contacts and deal pipelines" },
  { name: "BigQuery", desc: "Direct warehouse query" },
  { name: "Snowflake", desc: "Live warehouse connection" }
];

export default function UploadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Data ingestion"
        title="Upload data"
        description="Import CRM exports, sales ledgers, or live warehouse feeds. Schema mapping, validation, and PII handling run automatically."
      />

      <section className="dash-card">
        <motion.div
          className="dropzone"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
            <CloudUpload size={22} className="text-secondary" />
          </div>
          <h3 className="mt-4 font-headline text-xl font-bold tracking-tight text-white">
            Drop CSV, Parquet or XLSX here
          </h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            Up to 250 MB per file · headers auto-detected · encoding normalized
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <button className="btn">Browse files</button>
            <button className="btn-ghost">
              <LinkIcon size={12} style={{ marginRight: 6 }} /> Connect warehouse
            </button>
          </div>
        </motion.div>

        <div style={{ marginTop: "1.4rem" }}>
          <div className="panel-head">
            <div>
              <h4 className="section-title">Recent uploads</h4>
              <p className="section-sub">Live processing pipeline</p>
            </div>
            <span className="chip cyan">3 active</span>
          </div>

          <div style={{ display: "grid", gap: "0.65rem", marginTop: "0.95rem" }}>
            {files.map((f, i) => (
              <motion.div
                key={f.name}
                className="file-row"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
              >
                <span className="feed-icon">
                  <FileSpreadsheet size={14} />
                </span>
                <div>
                  <div className="cell-strong" style={{ fontSize: "0.92rem" }}>{f.name}</div>
                  <div className="cell-mono" style={{ marginTop: "0.2rem" }}>
                    {f.size} · {f.rows} rows
                  </div>
                  <div className="progress">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${f.progress}%` }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.05 }}
                    />
                  </div>
                </div>
                <span className={`chip ${f.status === "ready" ? "up" : "cyan"}`}>{f.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="g21">
        <section className="dash-card" aria-label="Data health">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Data health</h3>
              <p className="section-sub">Validation results across the latest batch.</p>
            </div>
            <span className="chip up">
              <CheckCircle2 size={11} style={{ marginRight: 4 }} /> 96% pass
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {checks.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  {c.status === "ok" ? (
                    <ShieldCheck size={14} className="text-tertiary" />
                  ) : (
                    <AlertTriangle size={14} className="text-[#ffb84d]" />
                  )}
                  <span className="cell-strong" style={{ fontSize: "0.86rem" }}>{c.label}</span>
                </div>
                <span className="cell-mono">{c.value}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="dash-card" aria-label="Connect a source">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Live connectors</h3>
              <p className="section-sub">Stream data straight from source.</p>
            </div>
            <Sparkles size={14} className="text-secondary" />
          </div>
          <div style={{ display: "grid", gap: "0.55rem", marginTop: "0.95rem" }}>
            {sources.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
              >
                <div>
                  <div className="cell-strong" style={{ fontSize: "0.88rem" }}>{s.name}</div>
                  <div className="cell-mono">{s.desc}</div>
                </div>
                <button className="btn-ghost">Connect</button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

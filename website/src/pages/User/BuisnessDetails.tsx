import { motion } from "framer-motion"
import {
  Briefcase,
  Upload,
  Download,
  Edit,
  FileText,
  Check,
  Clock,
} from "lucide-react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type BusinessDetailsCardProps = {
  positions: any;
  setUploadModalOpen: (open: boolean) => void;
  setEditModalOpen: (open: boolean) => void;
  windowSize: { width: number; height: number };
  handleDragEnd: (type: string, info: any) => void;
  startResize: (type: string, e: React.PointerEvent) => void;
}

export function BusinessDetailsCard({
  positions,
  setUploadModalOpen,
  setEditModalOpen,
  windowSize,
  handleDragEnd,
  startResize,
}:BusinessDetailsCardProps) {
  const business = {
    name: "Acme Inc.",
    type: "LLC",
    registrationNumber: "123456789",
    taxId: "98-7654321",
    established: "2015",
    industry: "E-commerce",
    kycStatus: "completed",
  }

  const documents = [
    { name: "Business License", status: "verified", uploaded: "2023-01-15" },
    { name: "Tax Certificate", status: "verified", uploaded: "2023-01-15" },
    { name: "Bank Statement", status: "pending", uploaded: "2023-05-20" },
  ]

  const handleDownloadDocuments = () => {
    toast.info("Download initiated", {
      description: "Your KYC documents will be downloaded shortly.",
    })
  }

  const handleRequestVerification = () => {
    toast.success("Verification requested", {
      description: "Our team will review your documents shortly.",
    })
  }

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      style={{
        x: positions.business.x,
        y: positions.business.y,
        width: positions.business.width,
        height: positions.business.height,
        zIndex: positions.business.zIndex,
      }}
      drag
      dragConstraints={{
        left: windowSize.width / 2 + 20,
        right: windowSize.width - positions.business.width - 20,
        top: 20,
        bottom: windowSize.height - positions.business.height - 20,
      }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragEnd={(_, info) => handleDragEnd("business", info)}
      whileDrag={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-30"
        onPointerDown={(e) => startResize("business", e)}
      >
        <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-teal-400 rounded-br-lg"></div>
      </div>

      <Card className="h-full bg-transparent border-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/50" />
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

        <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-inner">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Business Details
            </CardTitle>
          </div>

          <Badge
            className={`${
              business.kycStatus === "completed"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            } shadow-sm flex items-center gap-1`}
          >
            {business.kycStatus === "completed" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Clock className="h-3.5 w-3.5" />
            )}
            <span className="capitalize">{business.kycStatus}</span>
          </Badge>
        </CardHeader>

        <CardContent className="pt-2 pb-6 px-5">
          <div className="space-y-4 text-sm text-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                {business.name}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Type:</span>{" "}
                {business.type}
              </div>
              <div>
                <span className="font-semibold text-gray-600">
                  Registration No:
                </span>{" "}
                {business.registrationNumber}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Tax ID:</span>{" "}
                {business.taxId}
              </div>
              <div>
                <span className="font-semibold text-gray-600">
                  Established:
                </span>{" "}
                {business.established}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Industry:</span>{" "}
                {business.industry}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="font-medium text-blue-800 mb-1">Documents</h4>
              <ul className="space-y-2">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>{doc.name}</span>
                    </div>
                    <Badge
                      className={`${
                        doc.status === "verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                onClick={handleDownloadDocuments}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Documents
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md"
                onClick={handleRequestVerification}
              >
                <Check className="h-4 w-4 mr-2" />
                Request Verification
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-md"
                onClick={() => setEditModalOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Business Details
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 shadow-md"
                onClick={() => setUploadModalOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

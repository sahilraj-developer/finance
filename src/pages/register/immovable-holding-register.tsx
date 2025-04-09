"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface ImmovableAsset {
  id: string
  assetId: string
  description: string
  location: string
  acquisitionDate: string
  acquisitionCost: number
  currentValue: number
  status: string
  documentRef: string
}

export default function ImmovableHoldingRegister() {
  const [assets, setAssets] = useState<ImmovableAsset[]>([
    {
      id: "1",
      assetId: "IMM-2023-001",
      description: "Municipal Office Building",
      location: "123 Government St.",
      acquisitionDate: "2010-05-15",
      acquisitionCost: 2500000,
      currentValue: 3200000,
      status: "In Use",
      documentRef: "DEED-2010-123",
    },
    {
      id: "2",
      assetId: "IMM-2023-002",
      description: "Public Library",
      location: "456 Knowledge Ave.",
      acquisitionDate: "2015-08-22",
      acquisitionCost: 1800000,
      currentValue: 2100000,
      status: "In Use",
      documentRef: "DEED-2015-456",
    },
    {
      id: "3",
      assetId: "IMM-2023-003",
      description: "Community Center",
      location: "789 Community Blvd.",
      acquisitionDate: "2018-03-10",
      acquisitionCost: 3200000,
      currentValue: 3500000,
      status: "In Use",
      documentRef: "DEED-2018-789",
    },
  ])

  const [newAsset, setNewAsset] = useState<Partial<ImmovableAsset>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAsset({
      ...newAsset,
      [name]: name === "acquisitionCost" || name === "currentValue" ? Number.parseFloat(value) : value,
    })
  }

  const handleAddAsset = () => {
    const asset = {
      id: Date.now().toString(),
      assetId: newAsset.assetId || `IMM-${new Date().getFullYear()}-${(assets.length + 1).toString().padStart(3, "0")}`,
      description: newAsset.description || "",
      location: newAsset.location || "",
      acquisitionDate: newAsset.acquisitionDate || new Date().toISOString().split("T")[0],
      acquisitionCost: newAsset.acquisitionCost || 0,
      currentValue: newAsset.currentValue || 0,
      status: newAsset.status || "In Use",
      documentRef: newAsset.documentRef || "",
    }

    setAssets([...assets, asset])
    setNewAsset({})
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Immovable Holding</CardTitle>
        <CardDescription>Record of all immovable properties owned by the government entity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Property
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Immovable Property</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assetId" className="text-right">
                    Asset ID
                  </Label>
                  <Input
                    id="assetId"
                    name="assetId"
                    value={newAsset.assetId || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={newAsset.description || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={newAsset.location || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="acquisitionDate" className="text-right">
                    Acquisition Date
                  </Label>
                  <Input
                    id="acquisitionDate"
                    name="acquisitionDate"
                    type="date"
                    value={newAsset.acquisitionDate || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="acquisitionCost" className="text-right">
                    Acquisition Cost
                  </Label>
                  <Input
                    id="acquisitionCost"
                    name="acquisitionCost"
                    type="number"
                    value={newAsset.acquisitionCost || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="currentValue" className="text-right">
                    Current Value
                  </Label>
                  <Input
                    id="currentValue"
                    name="currentValue"
                    type="number"
                    value={newAsset.currentValue || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Input
                    id="status"
                    name="status"
                    value={newAsset.status || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="documentRef" className="text-right">
                    Document Reference
                  </Label>
                  <Input
                    id="documentRef"
                    name="documentRef"
                    value={newAsset.documentRef || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddAsset}>Add Property</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Acquisition Date</TableHead>
                <TableHead className="text-right">Acquisition Cost</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Document Ref</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.assetId}</TableCell>
                  <TableCell>{asset.description}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.acquisitionDate}</TableCell>
                  <TableCell className="text-right">
                    {asset.acquisitionCost.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right">
                    {asset.currentValue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.documentRef}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

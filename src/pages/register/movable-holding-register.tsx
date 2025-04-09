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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MovableAsset {
  id: string
  assetId: string
  description: string
  category: string
  serialNumber: string
  acquisitionDate: string
  acquisitionCost: number
  currentValue: number
  location: string
  condition: string
  assignedTo: string
}

export default function MovableHoldingRegister() {
  const [assets, setAssets] = useState<MovableAsset[]>([
    {
      id: "1",
      assetId: "MOV-2023-001",
      description: "Toyota Land Cruiser",
      category: "Vehicle",
      serialNumber: "VIN-12345678901234567",
      acquisitionDate: "2021-03-15",
      acquisitionCost: 65000,
      currentValue: 55000,
      location: "Transport Department",
      condition: "Good",
      assignedTo: "Field Operations",
    },
    {
      id: "2",
      assetId: "MOV-2023-002",
      description: "Dell Precision Workstation",
      category: "IT Equipment",
      serialNumber: "SN-DELL-987654321",
      acquisitionDate: "2022-01-10",
      acquisitionCost: 2500,
      currentValue: 1800,
      location: "IT Department",
      condition: "Excellent",
      assignedTo: "GIS Division",
    },
    {
      id: "3",
      assetId: "MOV-2023-003",
      description: "Heavy Duty Generator",
      category: "Equipment",
      serialNumber: "GEN-2022-456789",
      acquisitionDate: "2022-06-22",
      acquisitionCost: 12000,
      currentValue: 10500,
      location: "Facilities Department",
      condition: "Good",
      assignedTo: "Emergency Response",
    },
  ])

  const [newAsset, setNewAsset] = useState<Partial<MovableAsset>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAsset({
      ...newAsset,
      [name]: name === "acquisitionCost" || name === "currentValue" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewAsset({
      ...newAsset,
      [name]: value,
    })
  }

  const handleAddAsset = () => {
    const asset = {
      id: Date.now().toString(),
      assetId: newAsset.assetId || `MOV-${new Date().getFullYear()}-${(assets.length + 1).toString().padStart(3, "0")}`,
      description: newAsset.description || "",
      category: newAsset.category || "Other",
      serialNumber: newAsset.serialNumber || "",
      acquisitionDate: newAsset.acquisitionDate || new Date().toISOString().split("T")[0],
      acquisitionCost: newAsset.acquisitionCost || 0,
      currentValue: newAsset.currentValue || 0,
      location: newAsset.location || "",
      condition: newAsset.condition || "Good",
      assignedTo: newAsset.assignedTo || "",
    }

    setAssets([...assets, asset])
    setNewAsset({})
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Movable Holding</CardTitle>
        <CardDescription>Record of all movable assets owned by the government entity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Asset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Movable Asset</DialogTitle>
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
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("category", value)}
                    defaultValue={newAsset.category}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vehicle">Vehicle</SelectItem>
                      <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                      <SelectItem value="Office Equipment">Office Equipment</SelectItem>
                      <SelectItem value="Machinery">Machinery</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="serialNumber" className="text-right">
                    Serial Number
                  </Label>
                  <Input
                    id="serialNumber"
                    name="serialNumber"
                    value={newAsset.serialNumber || ""}
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
                  <Label htmlFor="condition" className="text-right">
                    Condition
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("condition", value)}
                    defaultValue={newAsset.condition}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Obsolete">Obsolete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assignedTo" className="text-right">
                    Assigned To
                  </Label>
                  <Input
                    id="assignedTo"
                    name="assignedTo"
                    value={newAsset.assignedTo || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddAsset}>Add Asset</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Acquisition Date</TableHead>
                <TableHead className="text-right">Acquisition Cost</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.assetId}</TableCell>
                  <TableCell>{asset.description}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.serialNumber}</TableCell>
                  <TableCell>{asset.acquisitionDate}</TableCell>
                  <TableCell className="text-right">
                    {asset.acquisitionCost.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right">
                    {asset.currentValue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.condition}</TableCell>
                  <TableCell>{asset.assignedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

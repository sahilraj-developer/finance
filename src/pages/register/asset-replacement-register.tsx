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
import { Textarea } from "@/components/ui/textarea"

interface AssetReplacement {
  id: string
  assetId: string
  assetName: string
  category: string
  acquisitionDate: string
  originalCost: number
  estimatedLifeYears: number
  replacementDate: string
  estimatedReplacementCost: number
  fundingSource: string
  notes: string
}

export default function AssetReplacementRegister() {
  const [assets, setAssets] = useState<AssetReplacement[]>([
    {
      id: "1",
      assetId: "VEH-2018-001",
      assetName: "Fire Truck",
      category: "Vehicle",
      acquisitionDate: "2018-05-15",
      originalCost: 450000,
      estimatedLifeYears: 10,
      replacementDate: "2028-05-15",
      estimatedReplacementCost: 650000,
      fundingSource: "Capital Improvement Fund",
      notes: "Essential emergency response vehicle",
    },
    {
      id: "2",
      assetId: "IT-2020-015",
      assetName: "Server Infrastructure",
      category: "IT Equipment",
      acquisitionDate: "2020-08-22",
      originalCost: 85000,
      estimatedLifeYears: 5,
      replacementDate: "2025-08-22",
      estimatedReplacementCost: 95000,
      fundingSource: "IT Modernization Fund",
      notes: "Critical for all digital services",
    },
    {
      id: "3",
      assetId: "MACH-2019-008",
      assetName: "Road Paver",
      category: "Machinery",
      acquisitionDate: "2019-03-10",
      originalCost: 320000,
      estimatedLifeYears: 8,
      replacementDate: "2027-03-10",
      estimatedReplacementCost: 380000,
      fundingSource: "Public Works Fund",
      notes: "Used for road maintenance projects",
    },
  ])

  const [newAsset, setNewAsset] = useState<Partial<AssetReplacement>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAsset({
      ...newAsset,
      [name]:
        name === "originalCost" || name === "estimatedReplacementCost" || name === "estimatedLifeYears"
          ? Number.parseFloat(value)
          : value,
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
      assetId: newAsset.assetId || "",
      assetName: newAsset.assetName || "",
      category: newAsset.category || "",
      acquisitionDate: newAsset.acquisitionDate || new Date().toISOString().split("T")[0],
      originalCost: newAsset.originalCost || 0,
      estimatedLifeYears: newAsset.estimatedLifeYears || 0,
      replacementDate: newAsset.replacementDate || "",
      estimatedReplacementCost: newAsset.estimatedReplacementCost || 0,
      fundingSource: newAsset.fundingSource || "",
      notes: newAsset.notes || "",
    }

    setAssets([...assets, asset])
    setNewAsset({})
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Replacement Register</CardTitle>
        <CardDescription>Planning for future replacement of capital assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Asset for Replacement Planning</DialogTitle>
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
                  <Label htmlFor="assetName" className="text-right">
                    Asset Name
                  </Label>
                  <Input
                    id="assetName"
                    name="assetName"
                    value={newAsset.assetName || ""}
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
                      <SelectItem value="Machinery">Machinery</SelectItem>
                      <SelectItem value="Building">Building</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="originalCost" className="text-right">
                    Original Cost
                  </Label>
                  <Input
                    id="originalCost"
                    name="originalCost"
                    type="number"
                    value={newAsset.originalCost || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estimatedLifeYears" className="text-right">
                    Estimated Life (Years)
                  </Label>
                  <Input
                    id="estimatedLifeYears"
                    name="estimatedLifeYears"
                    type="number"
                    value={newAsset.estimatedLifeYears || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="replacementDate" className="text-right">
                    Replacement Date
                  </Label>
                  <Input
                    id="replacementDate"
                    name="replacementDate"
                    type="date"
                    value={newAsset.replacementDate || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estimatedReplacementCost" className="text-right">
                    Estimated Replacement Cost
                  </Label>
                  <Input
                    id="estimatedReplacementCost"
                    name="estimatedReplacementCost"
                    type="number"
                    value={newAsset.estimatedReplacementCost || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fundingSource" className="text-right">
                    Funding Source
                  </Label>
                  <Input
                    id="fundingSource"
                    name="fundingSource"
                    value={newAsset.fundingSource || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={newAsset.notes || ""}
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
                <TableHead>Asset Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Acquisition Date</TableHead>
                <TableHead className="text-right">Original Cost</TableHead>
                <TableHead>Est. Life (Years)</TableHead>
                <TableHead>Replacement Date</TableHead>
                <TableHead className="text-right">Est. Replacement Cost</TableHead>
                <TableHead>Funding Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.assetId}</TableCell>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.acquisitionDate}</TableCell>
                  <TableCell className="text-right">
                    {asset.originalCost.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{asset.estimatedLifeYears}</TableCell>
                  <TableCell>{asset.replacementDate}</TableCell>
                  <TableCell className="text-right">
                    {asset.estimatedReplacementCost.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{asset.fundingSource}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LandRecord {
  id: string
  surveyNumber: string
  location: string
  area: number
  areaUnit: string
  landUse: string
  acquisitionDate: string
  acquisitionCost: number
  currentValue: number
  titleDeedNumber: string
  registrationDate: string
  encumbrances: string
}

export default function LandRegister() {
  const [lands, setLands] = useState<LandRecord[]>([
    {
      id: "1",
      surveyNumber: "SRV-123-456-789",
      location: "North District, Block 5",
      area: 25000,
      areaUnit: "sq.m",
      landUse: "Public Park",
      acquisitionDate: "2005-08-12",
      acquisitionCost: 1200000,
      currentValue: 3500000,
      titleDeedNumber: "TD-2005-12345",
      registrationDate: "2005-09-01",
      encumbrances: "None",
    },
    {
      id: "2",
      surveyNumber: "SRV-234-567-890",
      location: "East District, Block 12",
      area: 5000,
      areaUnit: "sq.m",
      landUse: "Municipal Office",
      acquisitionDate: "2010-03-25",
      acquisitionCost: 850000,
      currentValue: 1200000,
      titleDeedNumber: "TD-2010-23456",
      registrationDate: "2010-04-15",
      encumbrances: "None",
    },
    {
      id: "3",
      surveyNumber: "SRV-345-678-901",
      location: "West District, Block 8",
      area: 15000,
      areaUnit: "sq.m",
      landUse: "Water Treatment Facility",
      acquisitionDate: "2015-11-10",
      acquisitionCost: 2100000,
      currentValue: 2800000,
      titleDeedNumber: "TD-2015-34567",
      registrationDate: "2015-12-05",
      encumbrances: "Easement for utility lines",
    },
  ])

  const [newLand, setNewLand] = useState<Partial<LandRecord>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewLand({
      ...newLand,
      [name]:
        name === "acquisitionCost" || name === "currentValue" || name === "area" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewLand({
      ...newLand,
      [name]: value,
    })
  }

  const handleAddLand = () => {
    const land = {
      id: Date.now().toString(),
      surveyNumber: newLand.surveyNumber || "",
      location: newLand.location || "",
      area: newLand.area || 0,
      areaUnit: newLand.areaUnit || "sq.m",
      landUse: newLand.landUse || "",
      acquisitionDate: newLand.acquisitionDate || new Date().toISOString().split("T")[0],
      acquisitionCost: newLand.acquisitionCost || 0,
      currentValue: newLand.currentValue || 0,
      titleDeedNumber: newLand.titleDeedNumber || "",
      registrationDate: newLand.registrationDate || new Date().toISOString().split("T")[0],
      encumbrances: newLand.encumbrances || "None",
    }

    setLands([...lands, land])
    setNewLand({})
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Land</CardTitle>
        <CardDescription>Record of all land parcels owned by the government entity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Land Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Land Record</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="surveyNumber" className="text-right">
                    Survey Number
                  </Label>
                  <Input
                    id="surveyNumber"
                    name="surveyNumber"
                    value={newLand.surveyNumber || ""}
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
                    value={newLand.location || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="area" className="text-right">
                    Area
                  </Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    value={newLand.area || ""}
                    onChange={handleInputChange}
                    className="col-span-2"
                  />
                  <Select
                    onValueChange={(value) => handleSelectChange("areaUnit", value)}
                    defaultValue={newLand.areaUnit || "sq.m"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sq.m">sq.m</SelectItem>
                      <SelectItem value="sq.ft">sq.ft</SelectItem>
                      <SelectItem value="acres">acres</SelectItem>
                      <SelectItem value="hectares">hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="landUse" className="text-right">
                    Land Use
                  </Label>
                  <Input
                    id="landUse"
                    name="landUse"
                    value={newLand.landUse || ""}
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
                    value={newLand.acquisitionDate || ""}
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
                    value={newLand.acquisitionCost || ""}
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
                    value={newLand.currentValue || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="titleDeedNumber" className="text-right">
                    Title Deed Number
                  </Label>
                  <Input
                    id="titleDeedNumber"
                    name="titleDeedNumber"
                    value={newLand.titleDeedNumber || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="registrationDate" className="text-right">
                    Registration Date
                  </Label>
                  <Input
                    id="registrationDate"
                    name="registrationDate"
                    type="date"
                    value={newLand.registrationDate || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="encumbrances" className="text-right">
                    Encumbrances
                  </Label>
                  <Textarea
                    id="encumbrances"
                    name="encumbrances"
                    value={newLand.encumbrances || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddLand}>Add Land Record</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Survey Number</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Land Use</TableHead>
                <TableHead>Acquisition Date</TableHead>
                <TableHead className="text-right">Acquisition Cost</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead>Title Deed Number</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Encumbrances</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lands.map((land) => (
                <TableRow key={land.id}>
                  <TableCell>{land.surveyNumber}</TableCell>
                  <TableCell>{land.location}</TableCell>
                  <TableCell>{`${land.area} ${land.areaUnit}`}</TableCell>
                  <TableCell>{land.landUse}</TableCell>
                  <TableCell>{land.acquisitionDate}</TableCell>
                  <TableCell className="text-right">
                    {land.acquisitionCost.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right">
                    {land.currentValue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{land.titleDeedNumber}</TableCell>
                  <TableCell>{land.registrationDate}</TableCell>
                  <TableCell>{land.encumbrances}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LightingFixture {
  id: string
  fixtureId: string
  location: string
  coordinates: string
  type: string
  wattage: number
  installationDate: string
  lastMaintenanceDate: string
  maintenanceSchedule: string
  status: string
  notes: string
}

export default function PublicLightingRegister() {
  const [fixtures, setFixtures] = useState<LightingFixture[]>([
    {
      id: "1",
      fixtureId: "PL-2021-001",
      location: "Main Street & 5th Avenue",
      coordinates: "40.7128° N, 74.0060° W",
      type: "LED Street Light",
      wattage: 150,
      installationDate: "2021-06-15",
      lastMaintenanceDate: "2023-01-10",
      maintenanceSchedule: "Annual",
      status: "Operational",
      notes: "Upgraded from sodium vapor in 2021",
    },
    {
      id: "2",
      fixtureId: "PL-2021-002",
      location: "Central Park Pathway",
      coordinates: "40.7135° N, 74.0046° W",
      type: "Solar LED Path Light",
      wattage: 60,
      installationDate: "2021-07-22",
      lastMaintenanceDate: "2023-01-15",
      maintenanceSchedule: "Annual",
      status: "Operational",
      notes: "Part of green initiative project",
    },
    {
      id: "3",
      fixtureId: "PL-2022-015",
      location: "Waterfront Promenade",
      coordinates: "40.7120° N, 74.0080° W",
      type: "Decorative Post Light",
      wattage: 80,
      installationDate: "2022-03-10",
      lastMaintenanceDate: "2023-02-05",
      maintenanceSchedule: "Bi-annual",
      status: "Needs Repair",
      notes: "Flickering reported on 2023-03-01",
    },
  ])

  const [newFixture, setNewFixture] = useState<Partial<LightingFixture>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewFixture({
      ...newFixture,
      [name]: name === "wattage" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewFixture({
      ...newFixture,
      [name]: value,
    })
  }

  const handleAddFixture = () => {
    const fixture = {
      id: Date.now().toString(),
      fixtureId:
        newFixture.fixtureId || `PL-${new Date().getFullYear()}-${(fixtures.length + 1).toString().padStart(3, "0")}`,
      location: newFixture.location || "",
      coordinates: newFixture.coordinates || "",
      type: newFixture.type || "",
      wattage: newFixture.wattage || 0,
      installationDate: newFixture.installationDate || new Date().toISOString().split("T")[0],
      lastMaintenanceDate: newFixture.lastMaintenanceDate || new Date().toISOString().split("T")[0],
      maintenanceSchedule: newFixture.maintenanceSchedule || "Annual",
      status: newFixture.status || "Operational",
      notes: newFixture.notes || "",
    }

    setFixtures([...fixtures, fixture])
    setNewFixture({})
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Public Lighting System</CardTitle>
        <CardDescription>Inventory and maintenance record of all public lighting fixtures</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Fixture
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lighting Fixture</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fixtureId" className="text-right">
                    Fixture ID
                  </Label>
                  <Input
                    id="fixtureId"
                    name="fixtureId"
                    value={newFixture.fixtureId || ""}
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
                    value={newFixture.location || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coordinates" className="text-right">
                    Coordinates
                  </Label>
                  <Input
                    id="coordinates"
                    name="coordinates"
                    value={newFixture.coordinates || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange("type", value)} defaultValue={newFixture.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LED Street Light">LED Street Light</SelectItem>
                      <SelectItem value="Solar LED Path Light">Solar LED Path Light</SelectItem>
                      <SelectItem value="Decorative Post Light">Decorative Post Light</SelectItem>
                      <SelectItem value="High Mast Light">High Mast Light</SelectItem>
                      <SelectItem value="Flood Light">Flood Light</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="wattage" className="text-right">
                    Wattage
                  </Label>
                  <Input
                    id="wattage"
                    name="wattage"
                    type="number"
                    value={newFixture.wattage || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="installationDate" className="text-right">
                    Installation Date
                  </Label>
                  <Input
                    id="installationDate"
                    name="installationDate"
                    type="date"
                    value={newFixture.installationDate || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastMaintenanceDate" className="text-right">
                    Last Maintenance
                  </Label>
                  <Input
                    id="lastMaintenanceDate"
                    name="lastMaintenanceDate"
                    type="date"
                    value={newFixture.lastMaintenanceDate || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maintenanceSchedule" className="text-right">
                    Maintenance Schedule
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("maintenanceSchedule", value)}
                    defaultValue={newFixture.maintenanceSchedule}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Bi-annual">Bi-annual</SelectItem>
                      <SelectItem value="Annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("status", value)}
                    defaultValue={newFixture.status}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operational">Operational</SelectItem>
                      <SelectItem value="Needs Repair">Needs Repair</SelectItem>
                      <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                      <SelectItem value="Non-operational">Non-operational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={newFixture.notes || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddFixture}>Add Fixture</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fixture ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Wattage</TableHead>
                <TableHead>Installation Date</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fixtures.map((fixture) => (
                <TableRow key={fixture.id}>
                  <TableCell>{fixture.fixtureId}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {fixture.location}
                    </div>
                  </TableCell>
                  <TableCell>{fixture.type}</TableCell>
                  <TableCell className="text-right">{fixture.wattage}W</TableCell>
                  <TableCell>{fixture.installationDate}</TableCell>
                  <TableCell>{fixture.lastMaintenanceDate}</TableCell>
                  <TableCell>{fixture.maintenanceSchedule}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        fixture.status === "Operational"
                          ? "bg-green-100 text-green-800"
                          : fixture.status === "Needs Repair"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {fixture.status}
                    </span>
                  </TableCell>
                  <TableCell>{fixture.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

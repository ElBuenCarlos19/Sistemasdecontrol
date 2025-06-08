"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { deletecookie } from "@/actions/logout"
import { useRouter } from "next/navigation"

// Tipo para los datos del estado
interface DeviceState {
  estadoled1: boolean
  estadoled2: boolean
  estadoled3: boolean
  estadosensor: boolean
  estadoobstaculo: boolean
}

// Tipo para los datos del historial
interface HistoryItem {
  id: number
  usuario: string
  accion: string
  fecha: string
  hora: string
}

// Modificar la función Dashboard para incluir el estado del usuario
export default function Dashboard() {
  // Estado para los dispositivos
  const [deviceState, setDeviceState] = useState<DeviceState>({
    estadoled1: false,
    estadoled2: false,
    estadoled3: false,
    estadosensor: false,
    estadoobstaculo: false,
  })

  // Estado para el historial
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Estado para indicar carga
  const [loading, setLoading] = useState(true)

  // Estado para el usuario actual
  const router = useRouter()

  const [obst, setObst] = useState(0)
  function conobst() {
    fetch("/api/consultarObstaculo")
      .then((res) => res.json())
      .then((data) => {
        setObst(data)
      })
  }
  // Modificar el useEffect para incluir el usuario actual en los datos de ejemplo
  useEffect(() => {
    // Simulación de carga de datos
    const loadData = async () => {
      setLoading(true)
      try {
        // Datos de ejemplo
        setDeviceState({
          estadoled1: false,
          estadoled2: false,
          estadoled3: false,
          estadosensor: false,
          estadoobstaculo: false,
        })
        await fetch("/api/insertarEstados", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            estadoled1: false,
            estadoled2: false,
            estadoled3: false,
            estadosensor: false,
            estadoobstaculo: false,
          }),
        })

        const res = await fetch("/api/consultarHistorial")
        const history = await res.json()
        // Datos de historial de ejemplo
        const formatted = history.historial.map((item) => {
          const fechaObj = new Date(item.fechahora);
          const fecha = fechaObj.toISOString().split("T")[0]; // YYYY-MM-DD
          const hora = fechaObj.toTimeString().split(" ")[0]; // HH:MM:SS

          return {
            id: item.id,
            usuario: item.usuario === 1 ? "admin1" : "admin2", // Aquí puedes personalizar según tu lógica de usuario
            accion: item.accion,
            fecha: fecha,
            hora: hora,
          };
        });

        setHistory(formatted);
      } catch (error) {
        console.error("Error al cargar datos:", error)
      } finally {
        setLoading(false)

      }
    }
    loadData()
    conobst()
    const interval = setInterval(conobst, 2500);
    return () => clearInterval(interval);
  }, [])

  // Modificar la función handleSwitchChange para incluir el usuario actual
  const handleSwitchChange = async (device: keyof DeviceState) => {
    // Calcular el nuevo estado ANTES de actualizar el estado de React
    const newState = {
      ...deviceState,
      [device]: !deviceState[device],
    };

    // Actualizar el estado local para una UI más responsiva
    setDeviceState(newState);

    // Usar el nuevo estado calculado para determinar la acción
    const action =
      device === "estadosensor"
        ? `${newState[device] ? "Activó" : "Desactivó"} sensor`
        : `${newState[device] ? "Encendió" : "Apagó"} ${device.replace("estado", "").toUpperCase()}`

    const newHistoryItem: HistoryItem = {
      id: history.length + 1,
      usuario: "admin1", // Usar el usuario actual
      accion: action,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toTimeString().split(" ")[0],
    }

    // Usar el nuevo estado calculado para la API
    await fetch("/api/insertarHistorial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        accion: action,
      }),
    })


    await fetch("/api/insertarEstados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        estadoled1: newState.estadoled1,
        estadoled2: newState.estadoled2,
        estadoled3: newState.estadoled3,
        estadosensor: newState.estadosensor,
        estadoobstaculo: newState.estadoobstaculo,
      }),
    })

    setHistory((prev) => [newHistoryItem, ...prev])
  }
  // Función para refrescar datos
  const refreshData = () => {
    // En una implementación real, esto recargaría los datos desde la API
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Modificar el header para incluir el selector de usuario
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            <span className="text-emerald-600">Panel</span> de Control
          </h1>
          <div className="flex items-center space-x-4">
            {/* Selector de usuario */}

            <Button variant="outline" onClick={refreshData} disabled={loading} className="flex items-center">
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
            <Link href="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Modificar el título del panel para mostrar el usuario actual */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-6 mb-6 grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <h2 className="text-xl font-semibold text-slate-800">
              Bienvenido
            </h2>
            <p className="text-slate-500">Gestiona tus dispositivos y monitorea su estado</p>
          </div>
          <div className="col-span-1 flex justify-end">
            <Button className="bg-red-500 hover:bg-red-600" onClick={
              async () => {
                deletecookie()
                router.push("/login")
              }
            } >Cerrar Sesión</Button>
          </div>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Device Controls */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Control de Dispositivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LED Controls */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-700">LEDs</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label htmlFor="led1" className="font-medium text-slate-600">
                          LED 1
                        </label>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${deviceState.estadoled1 ? "text-emerald-600" : "text-slate-500"}`}>
                            {deviceState.estadoled1 ? "Encendido" : "Apagado"}
                          </span>
                          <Switch
                            id="led1"
                            checked={deviceState.estadoled1}
                            onCheckedChange={() => handleSwitchChange("estadoled1")}
                            className="data-[state=checked]:bg-emerald-600"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label htmlFor="led2" className="font-medium text-slate-600">
                          LED 2
                        </label>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${deviceState.estadoled2 ? "text-emerald-600" : "text-slate-500"}`}>
                            {deviceState.estadoled2 ? "Encendido" : "Apagado"}
                          </span>
                          <Switch
                            id="led2"
                            checked={deviceState.estadoled2}
                            onCheckedChange={() => handleSwitchChange("estadoled2")}
                            className="data-[state=checked]:bg-emerald-600"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label htmlFor="led3" className="font-medium text-slate-600">
                          LED 3
                        </label>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${deviceState.estadoled3 ? "text-emerald-600" : "text-slate-500"}`}>
                            {deviceState.estadoled3 ? "Encendido" : "Apagado"}
                          </span>
                          <Switch
                            id="led3"
                            checked={deviceState.estadoled3}
                            onCheckedChange={() => handleSwitchChange("estadoled3")}
                            className="data-[state=checked]:bg-emerald-600"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Sensor Controls */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-700">Sensor FC-51</h3>
                    <div className="flex items-center justify-between mb-6">
                      <label htmlFor="sensor" className="font-medium text-slate-600">
                        Estado del Sensor
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${deviceState.estadosensor ? "text-emerald-600" : "text-slate-500"}`}>
                          {deviceState.estadosensor ? "Activado" : "Desactivado"}
                        </span>
                        <Switch
                          id="sensor"
                          checked={deviceState.estadosensor}
                          onCheckedChange={() => handleSwitchChange("estadosensor")}
                          className="data-[state=checked]:bg-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Sensor Status */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                      <h4 className="text-sm font-medium text-slate-500 mb-3">Estado de Detección</h4>
                      <div
                        className={`flex items-center p-3 rounded-lg ${deviceState.estadoobstaculo ? "bg-red-50" : "bg-emerald-50"}`}
                      >
                        {obst == 0 ? (
                         <>
                         <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                         <span className="font-medium text-emerald-700">Obstáculo NO Encontrado</span>
                       </>
                        ) : (         
                           <>
                           <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                           <span className="font-medium text-red-700">Obstáculo Encontrado</span>
                         </>
                        )}
                      </div>
                    </div>

                    {/* Sensor Status Badge */}
                    <div className="mt-4">
                      <Badge
                        className={`${deviceState.estadosensor
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                          } 
                          px-3 py-1 text-xs rounded-full`}
                      >
                        {deviceState.estadosensor ? "Sensor Activo" : "Sensor Inactivo"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History Table */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Historial de Actividad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Acción</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Hora</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.length > 0 ? (
                        history.map((item) => (
                          <TableRow key={item.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.usuario}</TableCell>
                            <TableCell>{item.accion}</TableCell>
                            <TableCell>{item.fecha}</TableCell>
                            <TableCell>{item.hora}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-slate-500">
                            No hay registros de actividad
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
            <div className="justify-center grid grid-cols-2 gap-4">
        <iframe width="450" height="260" style={{
          border: "1px solid #cccccc",
        }}  src="https://thingspeak.com/channels/2931822/charts/1?bgcolor=%2355asdas&color=%23d62020&dynamic=true&results=60&title=Estado+Obstaculo&type=spline&xaxis=Encontrado&yaxis=Tiempo"></iframe>
        <iframe width="450" height="260" style={{
          border: "1px solid #cccccc",
        }} src="https://thingspeak.com/channels/2931822/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
        <iframe width="450" height="260" style={{
          border: "1px solid #cccccc",
        }} src="https://thingspeak.com/channels/2931822/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
        <iframe width="450" height="260" style={{
          border: "1px solid #cccccc",
        }} src="https://thingspeak.com/channels/2931822/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>

        </div>
            </Card>
          </div>

          {/* Status Panel */}
          <div className="space-y-8">
            {/* System Status */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Estado del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Connection Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Conexión</span>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Conectado</Badge>
                  </div>

                  {/* Last Update */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Última actualización</span>
                    <span className="text-sm text-slate-500">{new Date().toLocaleString()}</span>
                  </div>

                  {/* Active Devices */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Dispositivos activos</span>
                    <span className="text-sm font-medium text-emerald-600">
                      {Object.values(deviceState).filter(Boolean).length} / {Object.values(deviceState).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Summary */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Resumen de Dispositivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* LEDs Summary */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">LEDs</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div
                        className={`p-2 rounded-md text-center ${deviceState.estadoled1 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}
                      >
                        LED 1
                      </div>
                      <div
                        className={`p-2 rounded-md text-center ${deviceState.estadoled2 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}
                      >
                        LED 2
                      </div>
                      <div
                        className={`p-2 rounded-md text-center ${deviceState.estadoled3 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}
                      >
                        LED 3
                      </div>
                    </div>
                  </div>

                  {/* Sensor Summary */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Sensor FC-51</h3>
                    <div className="flex items-center justify-between bg-slate-100 p-3 rounded-md">
                      <span className="text-slate-700">Estado</span>
                      <Badge
                        className={`${deviceState.estadosensor
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : "bg-slate-200 text-slate-800 hover:bg-slate-200"
                          }`}
                      >
                        {deviceState.estadosensor ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between bg-slate-100 p-3 rounded-md mt-2">
                      <span className="text-slate-700">Detección</span>
                      <Badge
                        className={`${deviceState.estadoobstaculo
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          }`}
                      >
                        {deviceState.estadoobstaculo ? "Obstáculo" : "Sin obstáculo"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      // Encender todos los LEDs
                      setDeviceState((prev) => ({
                        ...prev,
                        estadoled1: true,
                        estadoled2: true,
                        estadoled3: true,
                      }))
                    }}
                  >
                    Encender todos los LEDs
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Apagar todos los LEDs
                      setDeviceState((prev) => ({
                        ...prev,
                        estadoled1: false,
                        estadoled2: false,
                        estadoled3: false,
                      }))
                    }}
                  >
                    Apagar todos los LEDs
                  </Button>

                  <Button
                    className={`w-full ${deviceState.estadosensor ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    onClick={() => handleSwitchChange("estadosensor")}
                  >
                    {deviceState.estadosensor ? "Desactivar Sensor" : "Activar Sensor"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-8 py-6">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© {new Date().getFullYear()} Sistema de Control ESP32. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Desarrollado para Proyecto Universitario</p>
        </div>
      </footer>
    </div>
  )
}


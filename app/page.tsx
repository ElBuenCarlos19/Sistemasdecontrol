import Link from "next/link"
import { ArrowRight, Cpu, Zap, Gauge, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            <span className="text-emerald-600">ESP32</span> Control System
          </h1>
          <Link href="/login">
            <Button className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300">
              Ingresar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Sistema de Control con <span className="text-emerald-600">ESP32</span> y Sensor{" "}
              <span className="text-emerald-600">FC-51</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Plataforma avanzada para monitoreo y control de dispositivos IoT utilizando microcontroladores ESP32 y
              sensores de obstáculos FC-51.
            </p>
            <Link href="/dashboard" className="mt-8 inline-block">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                Ir al Panel de Control <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Cpu className="h-6 w-6 text-emerald-600 mr-2" />
                  <CardTitle className="text-2xl text-slate-800">ESP32</CardTitle>
                </div>
                <CardDescription>Microcontrolador de alto rendimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-slate-700">
                  <p>
                    El ESP32 es un microcontrolador de bajo costo y bajo consumo de energía con Wi-Fi y Bluetooth
                    integrados, ideal para aplicaciones IoT y proyectos de automatización.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Procesador dual-core Xtensa LX6 de hasta 240MHz</li>
                    <li>Wi-Fi 802.11 b/g/n y Bluetooth 4.2 integrados</li>
                    <li>520 KB de SRAM y soporte para memoria externa</li>
                    <li>34 pines GPIO programables</li>
                    <li>Interfaces SPI, I2C, I2S, UART, etc.</li>
                    <li>12-bit ADC y 8-bit DAC</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <a
                  href="https://www.espressif.com/en/products/socs/esp32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 flex items-center font-medium"
                >
                  Más información <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>

            <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Gauge className="h-6 w-6 text-emerald-600 mr-2" />
                  <CardTitle className="text-2xl text-slate-800">Sensor FC-51</CardTitle>
                </div>
                <CardDescription>Sensor infrarrojo de detección de obstáculos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-slate-700">
                  <p>
                    El FC-51 es un sensor infrarrojo de detección de obstáculos ampliamente utilizado en robótica y
                    sistemas de automatización para detectar objetos y evitar colisiones.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Distancia de detección ajustable (2-30cm)</li>
                    <li>Salida digital (HIGH/LOW)</li>
                    <li>LED indicador de estado</li>
                    <li>Voltaje de operación: 3.3V-5V DC</li>
                    <li>Consumo de corriente: &lt;20mA</li>
                    <li>Dimensiones compactas: 3.2 x 1.4 cm</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <a
                  href="https://components101.com/sensors/ir-sensor-module"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 flex items-center font-medium"
                >
                  Más información <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          </div>

          {/* System Architecture */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Zap className="h-6 w-6 text-emerald-600 mr-2" />
              Arquitectura del Sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-slate-700 space-y-4">
                <p>
                  Nuestro sistema integra hardware y software para crear una solución completa de monitoreo y control:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Hardware:</strong> ESP32, sensor FC-51, LEDs indicadores, y circuitos de acondicionamiento.
                  </li>
                  <li>
                    <strong>Firmware:</strong> Programado en Arduino IDE, gestiona la comunicación y control de los
                    dispositivos.
                  </li>
                  <li>
                    <strong>Backend:</strong> API RESTful para la comunicación entre el hardware y la interfaz web.
                  </li>
                  <li>
                    <strong>Frontend:</strong> Interfaz web responsive para monitoreo y control en tiempo real.
                  </li>
                  <li>
                    <strong>Base de datos:</strong> Almacenamiento de eventos y estados para análisis histórico.
                  </li>
                </ul>
                <p className="mt-4">
                  La comunicación entre componentes se realiza mediante protocolos estándar como HTTP/WebSockets para la
                  comunicación web y UART/Serial para la comunicación con el hardware.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Diagrama de Flujo de Datos</h3>
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-emerald-100 text-emerald-800 font-medium px-4 py-2 rounded-lg w-full text-center">
                    Usuario (Interfaz Web)
                  </div>
                  <div className="h-6 w-0.5 bg-slate-300"></div>
                  <div className="bg-emerald-100 text-emerald-800 font-medium px-4 py-2 rounded-lg w-full text-center">
                    API Backend
                  </div>
                  <div className="h-6 w-0.5 bg-slate-300"></div>
                  <div className="bg-emerald-100 text-emerald-800 font-medium px-4 py-2 rounded-lg w-full text-center">
                    Base de Datos
                  </div>
                  <div className="h-6 w-0.5 bg-slate-300"></div>
                  <div className="bg-emerald-100 text-emerald-800 font-medium px-4 py-2 rounded-lg w-full text-center">
                    ESP32 (Firmware)
                  </div>
                  <div className="h-6 w-0.5 bg-slate-300"></div>
                  <div className="flex justify-center w-full space-x-4">
                    <div className="bg-emerald-100 text-emerald-800 font-medium px-4 py-2 rounded-lg text-center flex-1">
                      Sensor FC-51
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 font-medium px-4 py-2 rounded-lg text-center flex-1">
                      LEDs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">¿Listo para comenzar?</h2>
            <p className="text-slate-600 mb-8">
              Accede al panel de control para monitorear y controlar tus dispositivos en tiempo real.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                Ir al Panel de Control <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Sistema de Control ESP32. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Desarrollado para Proyecto Universitario</p>
        </div>
      </footer>
    </div>
  )
}


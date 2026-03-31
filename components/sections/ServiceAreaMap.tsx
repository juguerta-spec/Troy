'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
    initServiceAreaMap: () => void
  }
}

interface Zone {
  name: string
  lat: number
  lng: number
  region: 'montreal' | 'ottawa'
}

const ZONES: Zone[] = [
  // Montreal West
  { name: 'Vaudreuil-Dorion', lat: 45.3986, lng: -74.0271, region: 'montreal' },
  { name: 'Hudson', lat: 45.4451, lng: -74.1488, region: 'montreal' },
  { name: 'Saint-Lazare', lat: 45.3984, lng: -74.1338, region: 'montreal' },
  { name: 'Pointe-Claire', lat: 45.4490, lng: -73.8275, region: 'montreal' },
  { name: 'Dollard-des-Ormeaux', lat: 45.4936, lng: -73.8274, region: 'montreal' },
  { name: 'Kirkland', lat: 45.4486, lng: -73.8710, region: 'montreal' },
  { name: 'Beaconsfield', lat: 45.4314, lng: -73.8659, region: 'montreal' },
  { name: 'Châteauguay', lat: 45.3806, lng: -73.7425, region: 'montreal' },
  { name: "L'Île-Perrot", lat: 45.3775, lng: -73.9411, region: 'montreal' },
  { name: 'Pincourt', lat: 45.3783, lng: -73.9805, region: 'montreal' },
  { name: 'Valleyfield', lat: 45.2533, lng: -74.1325, region: 'montreal' },
  // Ottawa East
  { name: 'Hawkesbury', lat: 45.6054, lng: -74.6019, region: 'ottawa' },
  { name: 'Alexandria', lat: 45.3213, lng: -74.6331, region: 'ottawa' },
  { name: 'Rockland', lat: 45.5506, lng: -75.2912, region: 'ottawa' },
  { name: 'Embrun', lat: 45.2763, lng: -75.2922, region: 'ottawa' },
  { name: 'Casselman', lat: 45.3127, lng: -75.0861, region: 'ottawa' },
  { name: 'Vankleek Hill', lat: 45.5239, lng: -74.6488, region: 'ottawa' },
  { name: 'Orléans', lat: 45.4759, lng: -75.5126, region: 'ottawa' },
]

// Map center between Montreal West and Ottawa East
const MAP_CENTER = { lat: 45.42, lng: -74.18 }
const MAP_ZOOM = 9

export function ServiceAreaMap() {
  const { t } = useTranslation('common')
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) return

    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return

      const map = new window.google.maps.Map(mapRef.current, {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a9a' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a2e' }] },
          { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4a4a6a' }] },
          { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#3a3a5a' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#252545' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2d2d50' }] },
          { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#6a6a8a' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
          { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3a4a5a' }] },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
          { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#16162a' }] },
          { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#9090b0' }] },
        ],
      })

      mapInstanceRef.current = map

      ZONES.forEach((zone) => {
        const isOttawa = zone.region === 'ottawa'
        const color = isOttawa ? '#6ee7b7' : '#93c5fd' // emerald for Ottawa, blue for Montreal

        // Outer pulse ring
        new window.google.maps.Circle({
          map,
          center: { lat: zone.lat, lng: zone.lng },
          radius: 6000,
          strokeColor: color,
          strokeOpacity: 0.15,
          strokeWeight: 1,
          fillColor: color,
          fillOpacity: 0.05,
        })

        // Inner glow
        new window.google.maps.Circle({
          map,
          center: { lat: zone.lat, lng: zone.lng },
          radius: 2500,
          strokeColor: color,
          strokeOpacity: 0.4,
          strokeWeight: 1,
          fillColor: color,
          fillOpacity: 0.15,
        })

        // Center pin marker
        const marker = new window.google.maps.Marker({
          map,
          position: { lat: zone.lat, lng: zone.lng },
          title: zone.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 1.5,
          },
        })

        // Info window on click
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#111;padding:2px 4px;">${zone.name}</div>`,
        })
        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
      })
    }

    // Load Google Maps script if not already loaded
    if (window.google?.maps) {
      initMap()
    } else {
      window.initServiceAreaMap = initMap
      if (!document.querySelector('#google-maps-script')) {
        const script = document.createElement('script')
        script.id = 'google-maps-script'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initServiceAreaMap`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    }
  }, [])

  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,197,253,0.03),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-silver/40 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {t('service_area.label')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('service_area.title')}
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed">
            {t('service_area.subtitle')}
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-8 mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.6)]" />
            <span className="text-zinc-400 text-xs font-semibold">{t('service_area.region_montreal')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.6)]" />
            <span className="text-zinc-400 text-xs font-semibold">{t('service_area.region_ottawa')}</span>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_0_60px_rgba(0,0,0,0.5)]"
          style={{ height: '480px' }}
        >
          <div ref={mapRef} className="w-full h-full" />
        </motion.div>

        {/* Cities grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Montreal */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]" />
              <h3 className="text-white font-semibold text-sm">{t('service_area.region_montreal')}</h3>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {ZONES.filter(z => z.region === 'montreal').map(z => z.name).join(' · ')}
            </p>
          </div>
          {/* Ottawa */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
              <h3 className="text-white font-semibold text-sm">{t('service_area.region_ottawa')}</h3>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {ZONES.filter(z => z.region === 'ottawa').map(z => z.name).join(' · ')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

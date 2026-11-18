import { useMemo, useState } from 'react';
import { Calendar, Clock, MapPin, User, X } from 'lucide-react';
import {
  ACADEMIC_EVENTS,
  CURRICULUM_TRACKS,
  EXTRACURRICULARS,
  GALLERY_ITEMS,
} from '../data/schoolData';
import {
  AcademicEventCategory,
  ExtracurricularCategory,
  GalleryItem,
} from '../types/portal';
import { PortalImage } from './PortalImage';

const EKSKUL_CATEGORIES: ExtracurricularCategory[] = [
  'Semua',
  'Kepanduan & Ilmiah',
  'Seni & Budaya',
  'Olahraga',
  'Keagamaan',
];

const EVENT_CATEGORIES: AcademicEventCategory[] = [
  'Semua',
  'Akademik',
  'Kesiswaan',
  'PPDB',
  'Libur',
];

const GALLERY_CATEGORIES: Array<'Semua' | GalleryItem['kategori']> = [
  'Semua',
  'Kampus',
  'Pembelajaran',
  'Budaya & Ekskul',
];

export function AcademicView() {
  const [ekskulFilter, setEkskulFilter] = useState<ExtracurricularCategory>('Semua');
  const [eventFilter, setEventFilter] = useState<AcademicEventCategory>('Semua');
  const [galleryFilter, setGalleryFilter] = useState<'Semua' | GalleryItem['kategori']>('Semua');
  const [activeGallery, setActiveGallery] = useState<GalleryItem | null>(null);

  const filteredEkskul = useMemo(
    () =>
      ekskulFilter === 'Semua'
        ? EXTRACURRICULARS
        : EXTRACURRICULARS.filter((e) => e.kategori === ekskulFilter),
    [ekskulFilter]
  );

  const filteredEvents = useMemo(
    () =>
      eventFilter === 'Semua'
        ? ACADEMIC_EVENTS
        : ACADEMIC_EVENTS.filter((e) => e.kategori === eventFilter),
    [eventFilter]
  );

  const filteredGallery = useMemo(
    () =>
      galleryFilter === 'Semua'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((g) => g.kategori === galleryFilter),
    [galleryFilter]
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Halaman */}
      <section className="border-b border-[#E2DDD4] pb-10">
        <p className="text-xs font-medium text-[#B45309] mb-2">Kurikulum & Kesiswaan</p>
        <h1
          className="font-display font-bold text-[#1C1917] leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
        >
          Akademik, Ekstrakurikuler & Agenda
        </h1>
        <p className="text-base text-[#57534E] max-w-2xl leading-relaxed">
          Penyelenggaraan Kurikulum Merdeka untuk kelas VII, VIII, dan IX yang diimbangi pengembangan minat bakat siswa, kalender pembelajaran terstruktur, serta dokumentasi kehidupan kampus.
        </p>
      </section>

      {/* Struktur Kurikulum */}
      <section className="space-y-8 border-b border-[#E2DDD4] pb-14">
        <div>
          <p className="text-xs font-medium text-[#57534E] mb-1">Struktur Pembelajaran</p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            Tiga Pilar Kurikulum SMP Negeri 2 Pulung
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURRICULUM_TRACKS.map((track) => (
            <div
              key={track.nomor}
              className="bg-white border border-[#E2DDD4] rounded-lg p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <p className="font-mono-tabular text-xs font-semibold text-[#1E3A8A]">
                  {track.nomor}.
                </p>
                <h3 className="font-display text-xl font-semibold text-[#1C1917] leading-snug">
                  {track.judul}
                </h3>
                <p className="text-xs font-medium text-[#B45309]">{track.fokus}</p>
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed pt-3 border-t border-[#E2DDD4]">
                {track.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ekstrakurikuler */}
      <section className="space-y-8 border-b border-[#E2DDD4] pb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#B45309] mb-1">Pengembangan Diri</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Kegiatan Ekstrakurikuler Siswa
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter Ekstrakurikuler"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg"
          >
            {EKSKUL_CATEGORIES.map((cat) => {
              const active = ekskulFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setEkskulFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEkskul.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#E2DDD4] rounded-lg p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs text-[#57534E]">
                  <span className="font-semibold text-[#B45309]">{item.kategori}</span>
                  <span>{item.capaian}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {item.nama}
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{item.deskripsi}</p>
              </div>

              <dl className="pt-4 border-t border-[#E2DDD4] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#57534E]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.jadwal}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.lokasi}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.pembina}</span>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* Kalender Akademik */}
      <section className="space-y-8 border-b border-[#E2DDD4] pb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#57534E] mb-1">Tahun Pelajaran 2026/2027</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Kalender & Agenda Akademik
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter Agenda Akademik"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg"
          >
            {EVENT_CATEGORIES.map((cat) => {
              const active = eventFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setEventFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-[#E2DDD4] rounded-lg overflow-hidden">
          <div className="divide-y divide-[#E2DDD4]">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-5 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start"
              >
                <div className="md:col-span-3 flex items-center gap-2 text-sm font-mono-tabular font-semibold text-[#1E3A8A]">
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{ev.tanggal}</span>
                </div>
                <div className="md:col-span-7 space-y-1">
                  <h3 className="text-base font-semibold text-[#1C1917]">{ev.judul}</h3>
                  <p className="text-sm text-[#57534E]">{ev.keterangan}</p>
                </div>
                <div className="md:col-span-2 md:text-right text-xs font-medium text-[#B45309]">
                  {ev.kategori}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Dokumentasi */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#B45309] mb-1">Arsip Foto Sekolah</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Galeri Lingkungan & Kegiatan
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter Galeri Foto"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const active = galleryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveGallery(item)}
              className="text-left group bg-white border border-[#E2DDD4] rounded-lg overflow-hidden hover:border-[#1E3A8A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <PortalImage
                  src={item.gambarUrl}
                  alt={item.judul}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <p className="text-xs text-[#57534E]">
                  {item.kategori} · {item.tanggal}
                </p>
                <h3 className="text-base font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors">
                  {item.judul}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">{item.deskripsi}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal Galeri */}
      {activeGallery && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeGallery.judul}
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
          onClick={() => setActiveGallery(null)}
        >
          <div
            className="bg-[#FBF9F5] border border-[#E2DDD4] rounded-lg max-w-3xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2DDD4]">
              <div>
                <p className="text-xs text-[#57534E]">
                  {activeGallery.kategori} · {activeGallery.tanggal}
                </p>
                <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                  {activeGallery.judul}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveGallery(null)}
                aria-label="Tutup pratinjau foto"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md hover:bg-[#F2EFE9] text-[#1C1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[16/10] bg-[#EBE6DC]">
              <PortalImage
                src={activeGallery.gambarUrl}
                alt={activeGallery.judul}
                containerClassName="w-full h-full"
              />
            </div>
            <p className="px-5 py-4 text-sm text-[#57534E]">{activeGallery.deskripsi}</p>
          </div>
        </div>
      )}
    </div>
  );
}

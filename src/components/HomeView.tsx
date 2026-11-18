import { ArrowRight, BookOpen, Calendar, GraduationCap, Users } from 'lucide-react';
import {
  ACADEMIC_EVENTS,
  CURRICULUM_TRACKS,
  GALLERY_ITEMS,
  SCHOOL_IMAGES,
  SCHOOL_INFO,
} from '../data/schoolData';
import { NewsArticle, PortalView } from '../types/portal';
import { PortalImage } from './PortalImage';

interface HomeViewProps {
  news: NewsArticle[];
  onNavigate: (view: PortalView) => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export function HomeView({ news, onNavigate, onSelectArticle }: HomeViewProps) {
  const leadNews = news.find((n) => n.unggulan) || news[0];
  const secondaryNews = news.filter((n) => n.id !== leadNews?.id).slice(0, 3);
  const upcomingEvents = ACADEMIC_EVENTS.slice(0, 4);

  return (
    <div>
      {/* Institutional Hero Split */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#57534E] mb-4">
                Portal Pendidikan Negeri · Kecamatan Pulung, Ponorogo
              </p>

              <h1
                className="font-display font-bold text-[#1C1917] tracking-tight leading-[1.12] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
              >
                {SCHOOL_INFO.namaResmi}
              </h1>

              <p className="text-lg sm:text-xl font-display italic text-[#1E3A8A] leading-relaxed mb-5 max-w-xl">
                “{SCHOOL_INFO.visi}”
              </p>

              <p className="text-base text-[#57534E] leading-relaxed max-w-xl mb-8">
                Mengemban amanah mencerdaskan generasi muda di lereng barat daya Gunung Wilis sejak tahun 1966. Memadukan pembelajaran Kurikulum Merdeka, karakter berakhlak mulia, dan pelestarian kearifan budaya Ponorogo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('ppdb')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <span>Daftar PPDB Online</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('profil')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#1C1917] bg-white border border-[#E2DDD4] hover:border-[#1C1917] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <span>Profil & Sejarah</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-lg overflow-hidden border border-[#E2DDD4] flex-1 min-h-[280px] lg:min-h-[420px]">
              <PortalImage
                src={SCHOOL_IMAGES.campusHero}
                alt="Halaman utama dan gedung SMP Negeri 2 Pulung di Desa Kesugihan berlatar perbukitan Gunung Wilis"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none"
              />
              <p className="absolute bottom-4 left-4 right-4 text-xs text-white/95 leading-snug">
                Kampus SMP Negeri 2 Pulung · Desa Kesugihan, Kecamatan Pulung, Kabupaten Ponorogo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Utility Ribbon */}
      <section
        aria-label="Informasi Operasional Sekolah"
        className="border-y border-[#E2DDD4] bg-[#F2EFE9]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs text-[#57534E]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono-tabular font-semibold text-[#1C1917]">
              NPSN {SCHOOL_INFO.npsn}
            </span>
            <span aria-hidden="true">·</span>
            <span>Akreditasi {SCHOOL_INFO.akreditasi}</span>
            <span aria-hidden="true">·</span>
            <span>Desa Kesugihan, Kec. Pulung, Ponorogo</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Layanan Tata Usaha: {SCHOOL_INFO.jamLayanan}</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('ppdb')}
              className="font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
            >
              Cek Status PPDB
            </button>
          </div>
        </div>
      </section>

      {/* 4-Column Quantitative Strip */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#E2DDD4]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {SCHOOL_INFO.statistikUtama.map((stat) => (
            <div key={stat.label} className="space-y-1.5">
              <p className="font-mono-tabular text-3xl sm:text-4xl font-semibold text-[#1E3A8A] tracking-tight">
                {stat.angka}
              </p>
              <p className="text-sm font-semibold text-[#1C1917]">{stat.label}</p>
              <p className="text-xs text-[#57534E]">{stat.keterangan}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sambutan Kepala Sekolah & Pilar Pembelajaran */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E2DDD4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-medium text-[#B45309]">Sambutan Kepala Sekolah</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917] leading-snug">
              Menjaga Mutu Pembelajaran di Kaki Gunung Wilis
            </h2>
            <p className="text-base italic font-display text-[#1C1917] leading-relaxed py-4 border-y border-[#E2DDD4]">
              “{SCHOOL_INFO.sambutanKepala.kutipan}”
            </p>
            <div className="space-y-4 text-sm sm:text-base text-[#57534E] leading-relaxed max-w-prose">
              {SCHOOL_INFO.sambutanKepala.isi.map((paragraf, idx) => (
                <p key={idx}>{paragraf}</p>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-sm font-semibold text-[#1C1917]">
                {SCHOOL_INFO.sambutanKepala.nama}
              </p>
              <p className="text-xs text-[#57534E]">{SCHOOL_INFO.sambutanKepala.jabatan}</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-end justify-between gap-4 border-b border-[#E2DDD4] pb-4">
              <div>
                <p className="text-xs font-medium text-[#57534E] mb-1">Arah Pendidikan</p>
                <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
                  Program Akademik & Karakter
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('akademik')}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Lihat Kurikulum
              </button>
            </div>

            <div className="divide-y divide-[#E2DDD4]">
              {CURRICULUM_TRACKS.map((track) => (
                <div key={track.nomor} className="py-5 first:pt-2 last:pb-0">
                  <h3 className="text-base font-semibold text-[#1C1917] mb-1">
                    {track.nomor}. {track.judul}
                  </h3>
                  <p className="text-xs font-medium text-[#B45309] mb-2">{track.fokus}</p>
                  <p className="text-sm text-[#57534E] leading-relaxed">{track.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sorotan Berita & Pengumuman 3-Tier */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E2DDD4]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium text-[#B45309] mb-1">Kabar Sekolah</p>
            <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
              Berita & Pengumuman Terbaru
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('berita')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Semua Berita</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Lead Story */}
          {leadNews && (
            <article className="lg:col-span-7 group">
              <button
                type="button"
                onClick={() => onSelectArticle(leadNews)}
                className="w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
              >
                <div className="aspect-[16/10] rounded-lg overflow-hidden border border-[#E2DDD4] mb-5">
                  <PortalImage
                    src={leadNews.gambarUrl}
                    alt={leadNews.judul}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mb-2">
                  <span className="font-semibold text-[#1E3A8A]">{leadNews.kategori}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{leadNews.tanggal}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadNews.waktuBaca}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors leading-snug mb-3">
                  {leadNews.judul}
                </h3>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  {leadNews.ringkasan}
                </p>
              </button>
            </article>
          )}

          {/* Secondary News List */}
          <div className="lg:col-span-5 divide-y divide-[#E2DDD4] border-t lg:border-t-0 border-[#E2DDD4]">
            {secondaryNews.map((item) => (
              <article key={item.id} className="py-5 first:pt-5 lg:first:pt-0">
                <button
                  type="button"
                  onClick={() => onSelectArticle(item)}
                  className="w-full text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
                >
                  <div className="flex items-center gap-2 text-xs text-[#57534E] mb-1.5">
                    <span className="font-semibold text-[#B45309]">{item.kategori}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{item.tanggal}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors leading-snug mb-2">
                    {item.judul}
                  </h3>
                  <p className="text-sm text-[#57534E] line-clamp-2 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Terdekat & Galeri Lingkungan Sekolah */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Agenda Singkat */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-end justify-between gap-4 border-b border-[#E2DDD4] pb-4">
              <div>
                <p className="text-xs font-medium text-[#57534E] mb-1">Kalender Akademik</p>
                <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
                  Agenda Terdekat
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('akademik')}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Kalender Lengkap
              </button>
            </div>

            <div className="divide-y divide-[#E2DDD4]">
              {upcomingEvents.map((ev) => (
                <div key={ev.id} className="py-4 first:pt-0">
                  <div className="flex items-center justify-between gap-4 text-xs text-[#57534E] mb-1">
                    <span className="font-mono-tabular font-medium text-[#1E3A8A]">
                      {ev.tanggal}
                    </span>
                    <span>{ev.kategori}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#1C1917] mb-1">{ev.judul}</h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">{ev.keterangan}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Galeri Preview + Akses Cepat */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-end justify-between gap-4 border-b border-[#E2DDD4] pb-4">
              <div>
                <p className="text-xs font-medium text-[#57534E] mb-1">Kehidupan Kampus</p>
                <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
                  Aktivitas Siswa & Fasilitas
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('akademik')}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Buka Galeri
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {GALLERY_ITEMS.slice(1, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate('akademik')}
                  className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E2DDD4] mb-2.5">
                    <PortalImage
                      src={item.gambarUrl}
                      alt={item.judul}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-xs text-[#57534E] mb-0.5">
                    {item.kategori} · {item.tanggal}
                  </p>
                  <h3 className="text-sm font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors">
                    {item.judul}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Akses Cepat */}
        <div className="mt-16 rounded-lg bg-[#F2EFE9] border border-[#E2DDD4] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
              Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Calon peserta didik lulusan SD/MI dapat mendaftarkan diri melalui jalur Zonasi, Prestasi, Afirmasi, maupun Perpindahan Tugas Orang Tua serta mencetak bukti registrasi secara langsung.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('ppdb')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>Buka Formulir PPDB</span>
            </button>
          </div>
        </div>

        {/* Quick Feature Nav Row */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('profil')}
            className="flex items-start gap-3 p-4 bg-white border border-[#E2DDD4] rounded-lg hover:border-[#1E3A8A] transition-colors text-left cursor-pointer"
          >
            <Users className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#1C1917]">Direktori Guru & Staf</p>
              <p className="text-xs text-[#57534E] mt-0.5">Cari pendidik berdasarkan rumpun mata pelajaran</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('akademik')}
            className="flex items-start gap-3 p-4 bg-white border border-[#E2DDD4] rounded-lg hover:border-[#1E3A8A] transition-colors text-left cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#1C1917]">Ekstrakurikuler & P5</p>
              <p className="text-xs text-[#57534E] mt-0.5">Jadwal pembinaan Pramuka, KIR, Voli & Karawitan</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('akademik')}
            className="flex items-start gap-3 p-4 bg-white border border-[#E2DDD4] rounded-lg hover:border-[#1E3A8A] transition-colors text-left cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#1C1917]">Kalender Akademik</p>
              <p className="text-xs text-[#57534E] mt-0.5">Jadwal PSAS, pembagian rapor & kegiatan OSIS</p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { SCHOOL_IMAGES, SCHOOL_INFO, TEACHERS } from '../data/schoolData';
import { TeacherGroup } from '../types/portal';
import { PortalImage } from './PortalImage';

const TEACHER_GROUPS: TeacherGroup[] = [
  'Semua',
  'Pimpinan & BK',
  'Matematika & IPA',
  'Bahasa & Sastra',
  'IPS & PPKn',
  'Seni, PJOK & Agama',
  'Tata Usaha',
];

export function ProfileView() {
  const [selectedGroup, setSelectedGroup] = useState<TeacherGroup>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TEACHERS.filter((t) => {
      const matchGroup = selectedGroup === 'Semua' || t.rumpun === selectedGroup;
      const matchQuery =
        !q ||
        t.nama.toLowerCase().includes(q) ||
        t.jabatan.toLowerCase().includes(q) ||
        t.rumpun.toLowerCase().includes(q);
      return matchGroup && matchQuery;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Halaman */}
      <section className="border-b border-[#E2DDD4] pb-10">
        <p className="text-xs font-medium text-[#B45309] mb-2">Profil Lembaga</p>
        <h1
          className="font-display font-bold text-[#1C1917] leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
        >
          Sejarah, Visi Misi & Tenaga Pendidik
        </h1>
        <p className="text-base text-[#57534E] max-w-2xl leading-relaxed">
          Mengenal perjalanan SMP Negeri 2 Pulung sejak rintisan Sekolah Teknik Ponco Utomo tahun 1966 hingga menjadi sekolah menengah pertama negeri andalan masyarakat Kecamatan Pulung.
        </p>
      </section>

      {/* Sejarah & Identitas Sekolah (Asymmetric Editorial Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#E2DDD4] pb-14">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
            Jejak Sejarah (1966–Sekarang)
          </h2>

          <div className="space-y-4 text-base text-[#1C1917]/90 leading-[1.8] max-w-prose">
            {SCHOOL_INFO.sejarahParagraf.map((paragraf, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1E3A8A]'
                    : ''
                }
              >
                {paragraf}
              </p>
            ))}
          </div>

          <figure className="pt-4">
            <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#E2DDD4]">
              <PortalImage
                src={SCHOOL_IMAGES.libraryReading}
                alt="Ruang perpustakaan Ponco Utomo di SMP Negeri 2 Pulung"
                containerClassName="w-full h-full"
              />
            </div>
            <figcaption className="text-xs font-display italic text-[#57534E] mt-2">
              Fig. 1 — Perpustakaan Ponco Utomo SMP Negeri 2 Pulung yang dinamai untuk mengenang sejarah pendirian sekolah tahun 1966.
            </figcaption>
          </figure>
        </div>

        {/* Margin Identitas Sekolah */}
        <aside className="lg:col-span-5 space-y-8">
          <div className="bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-[#1C1917]">
              Identitas Resmi Sekolah
            </h2>
            <dl className="divide-y divide-[#E2DDD4] text-sm">
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#57534E]">Nama Sekolah</dt>
                <dd className="font-semibold text-[#1C1917] text-right">{SCHOOL_INFO.namaResmi}</dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#57534E]">NPSN</dt>
                <dd className="font-mono-tabular font-semibold text-[#1E3A8A] text-right">
                  {SCHOOL_INFO.npsn}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#57534E]">Status & Akreditasi</dt>
                <dd className="font-medium text-[#1C1917] text-right">
                  {SCHOOL_INFO.status} · Akreditasi {SCHOOL_INFO.akreditasi}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#57534E]">Tahun Rintisan</dt>
                <dd className="font-mono-tabular text-[#1C1917] text-right">
                  28 Juli {SCHOOL_INFO.tahunBerdiri}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#57534E]">Penetapan SMPN 2</dt>
                <dd className="font-mono-tabular text-[#1C1917] text-right">
                  {SCHOOL_INFO.tahunResmiSmpn}
                </dd>
              </div>
              <div className="py-2.5 flex flex-col gap-1">
                <dt className="text-[#57534E]">Alamat</dt>
                <dd className="text-[#1C1917] leading-relaxed">{SCHOOL_INFO.alamat}</dd>
              </div>
              <div className="py-2.5 flex flex-col gap-1">
                <dt className="text-[#57534E]">Letak Geografis</dt>
                <dd className="text-[#1C1917] leading-relaxed">{SCHOOL_INFO.wilayah}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white border border-[#E2DDD4] rounded-lg p-6 space-y-4">
            <p className="text-xs font-medium text-[#B45309]">Visi Sekolah</p>
            <p className="font-display text-xl italic text-[#1E3A8A] leading-relaxed">
              “{SCHOOL_INFO.visi}”
            </p>
            <div className="border-t border-[#E2DDD4] pt-4 space-y-3">
              <p className="text-xs font-semibold text-[#1C1917]">Misi Utama</p>
              <ol className="space-y-2.5 text-sm text-[#57534E] leading-relaxed">
                {SCHOOL_INFO.misi.map((m, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="font-mono-tabular text-xs font-semibold text-[#1E3A8A] pt-0.5 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>
      </section>

      {/* Direktori Guru & Staf */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-[#B45309] mb-1">Sumber Daya Pendidik</p>
            <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
              Direktori Guru & Tenaga Kependidikan
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="w-4 h-4 text-[#57534E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama guru atau mata pelajaran..."
              aria-label="Cari nama guru atau mata pelajaran"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E2DDD4] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#1E3A8A]"
            />
          </div>
        </div>

        {/* Filter Rumpun Mapel */}
        <div
          role="tablist"
          aria-label="Filter Rumpun Pendidik"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg"
        >
          {TEACHER_GROUPS.map((group) => {
            const active = selectedGroup === group;
            return (
              <button
                key={group}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedGroup(group)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-[#57534E]">
          <span>
            Menampilkan <strong className="font-mono-tabular text-[#1C1917]">{filteredTeachers.length}</strong> pendidik & tenaga kependidikan
          </span>
          {(selectedGroup !== 'Semua' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedGroup('Semua');
                setSearchQuery('');
              }}
              className="text-[#1E3A8A] font-semibold hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="py-14 text-center bg-white border border-[#E2DDD4] rounded-lg space-y-3">
            <p className="text-base font-semibold text-[#1C1917]">
              Data pendidik tidak ditemukan
            </p>
            <p className="text-sm text-[#57534E]">
              Coba ubah kata kunci pencarian atau pilih kategori rumpun lainnya.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedGroup('Semua');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md transition-colors cursor-pointer"
            >
              Tampilkan Semua Guru
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white border border-[#E2DDD4] rounded-lg p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1.5">
                  <p className="text-xs text-[#B45309] font-medium">{teacher.rumpun}</p>
                  <h3 className="text-base font-semibold text-[#1C1917]">{teacher.nama}</h3>
                  <p className="text-sm text-[#57534E] leading-snug">{teacher.jabatan}</p>
                </div>

                <div className="pt-3 border-t border-[#E2DDD4] space-y-1 text-xs text-[#57534E]">
                  <p className="font-mono-tabular text-[#1C1917]">{teacher.nipAtauStatus}</p>
                  <p>
                    {teacher.pendidikan} · Mengabdi{' '}
                    <span className="font-mono-tabular">{teacher.tahunMengabdi}</span> tahun
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

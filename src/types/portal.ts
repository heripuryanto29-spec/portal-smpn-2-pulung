export type PortalView = 'beranda' | 'profil' | 'akademik' | 'berita' | 'ppdb';

export type TeacherGroup =
  | 'Semua'
  | 'Pimpinan & BK'
  | 'Matematika & IPA'
  | 'Bahasa & Sastra'
  | 'IPS & PPKn'
  | 'Seni, PJOK & Agama'
  | 'Tata Usaha';

export interface TeacherItem {
  id: string;
  nama: string;
  nipAtauStatus: string;
  jabatan: string;
  rumpun: Exclude<TeacherGroup, 'Semua'>;
  pendidikan: string;
  tahunMengabdi: number;
}

export type NewsCategory = 'Semua' | 'Pengumuman' | 'Prestasi' | 'Kegiatan' | 'PPDB';

export interface NewsArticle {
  id: string;
  judul: string;
  ringkasan: string;
  isi: string[];
  kategori: Exclude<NewsCategory, 'Semua'>;
  tanggal: string;
  penulis: string;
  waktuBaca: string;
  unggulan?: boolean;
  gambarUrl?: string;
  keteranganGambar?: string;
  kustom?: boolean;
}

export type ExtracurricularCategory =
  | 'Semua'
  | 'Kepanduan & Ilmiah'
  | 'Seni & Budaya'
  | 'Olahraga'
  | 'Keagamaan';

export interface ExtracurricularItem {
  id: string;
  nama: string;
  kategori: Exclude<ExtracurricularCategory, 'Semua'>;
  jadwal: string;
  pembina: string;
  lokasi: string;
  deskripsi: string;
  capaian: string;
}

export type AcademicEventCategory = 'Semua' | 'Akademik' | 'Kesiswaan' | 'PPDB' | 'Libur';

export interface AcademicEvent {
  id: string;
  tanggal: string;
  bulan: string;
  judul: string;
  kategori: Exclude<AcademicEventCategory, 'Semua'>;
  keterangan: string;
}

export interface GalleryItem {
  id: string;
  judul: string;
  kategori: 'Kampus' | 'Pembelajaran' | 'Budaya & Ekskul';
  gambarUrl: string;
  deskripsi: string;
  tanggal: string;
}

export type PpdbTrack = 'Zonasi' | 'Prestasi' | 'Afirmasi' | 'Perpindahan Tugas';

export type PpdbStatus = 'Menunggu Verifikasi' | 'Terverifikasi' | 'Perlu Perbaikan Berkas';

export interface PpdbSubmission {
  noRegistrasi: string;
  nisn: string;
  namaLengkap: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  asalSekolah: string;
  jalur: PpdbTrack;
  nilaiRataRapor: string;
  namaWali: string;
  noTelepon: string;
  alamatDesa: string;
  kecamatan: string;
  tanggalDaftar: string;
  statusVerifikasi: PpdbStatus;
  catatanPanitia?: string;
}

export interface PpdbQuota {
  jalur: PpdbTrack;
  persentase: number;
  kuotaKursi: number;
  syaratUtama: string;
  keterangan: string;
}

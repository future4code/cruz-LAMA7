export interface ICreateBandRequestDTO {
  name: any
  music_genre: any
  responsible: any
  token: any
}

export interface ICreateBandValidDataDTO {
  name: string
  music_genre: string
  responsible: string
  token: string
}

export interface ICreateBandResponseDTO {
  message: string
}

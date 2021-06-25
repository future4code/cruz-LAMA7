import { ICreateBandRequestDTO, ICreateBandValidDataDTO } from './CreateBandDTO'

export class CreateBandValidator {
  validate(data: ICreateBandRequestDTO): ICreateBandValidDataDTO {
    if (!data.name || !data.music_genre || !data.responsible || !data.token) {
      throw new Error('Invalid Data')
    }
    return data
  }
}

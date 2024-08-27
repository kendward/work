import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';
import {
  CreateOrganizationDto,
  DeleteAccountDto,
  UpdateBillingInformationDto,
} from '../dto/organization.dto';

export interface IOrganizationService {
  saveBillingInformation(
    body: UpdateBillingInformationDto,
  ): Promise<ResponseOut<any>>;

  createOrganization(organization: CreateOrganizationDto): Promise<any>;

  deleteAccount(body: DeleteAccountDto): Promise<ResponseOut<any>>;
}

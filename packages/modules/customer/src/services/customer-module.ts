import {
  Context,
  CustomerAddressDTO,
  CustomerDTO,
  CustomerGroupCustomerDTO,
  CustomerGroupDTO,
  CustomerTypes,
  DAL,
  ICustomerModuleService,
  InferEntityType,
  InternalModuleDeclaration,
  ModuleJoinerConfig,
  ModulesSdkTypes,
} from "@medusajs/framework/types"

import {
  InjectManager,
  InjectTransactionManager,
  isString,
  MedusaContext,
  MedusaService,
} from "@medusajs/framework/utils"
import { EntityManager } from "@mikro-orm/core"
import {
  Customer,
  CustomerAddress,
  CustomerGroup,
  CustomerGroupCustomer,
} from "@models"
import { joinerConfig } from "../joiner-config"

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService
  customerService: ModulesSdkTypes.IMedusaInternalService<any>
  customerAddressService: ModulesSdkTypes.IMedusaInternalService<any>
  customerGroupService: ModulesSdkTypes.IMedusaInternalService<any>
  customerGroupCustomerService: ModulesSdkTypes.IMedusaInternalService<any>
}

export default class CustomerModuleService
  extends MedusaService<{
    CustomerAddress: { dto: CustomerAddressDTO }
    Customer: { dto: CustomerDTO }
    CustomerGroup: { dto: CustomerGroupDTO }
    CustomerGroupCustomer: { dto: CustomerGroupCustomerDTO }
  }>({
    CustomerAddress,
    Customer,
    CustomerGroup,
    CustomerGroupCustomer,
  })
  implements ICustomerModuleService
{
  protected baseRepository_: DAL.RepositoryService
  protected customerService_: ModulesSdkTypes.IMedusaInternalService<
    InferEntityType<typeof Customer>
  >
  protected customerAddressService_: ModulesSdkTypes.IMedusaInternalService<
    InferEntityType<typeof CustomerAddress>
  >
  protected customerGroupService_: ModulesSdkTypes.IMedusaInternalService<
    InferEntityType<typeof CustomerGroup>
  >
  protected customerGroupCustomerService_: ModulesSdkTypes.IMedusaInternalService<
    InferEntityType<typeof CustomerGroupCustomer>
  >

  constructor(
    {
      baseRepository,
      customerService,
      customerAddressService,
      customerGroupService,
      customerGroupCustomerService,
    }: InjectedDependencies,
    protected readonly moduleDeclaration: InternalModuleDeclaration
  ) {
    // @ts-ignore
    super(...arguments)

    this.baseRepository_ = baseRepository
    this.customerService_ = customerService
    this.customerAddressService_ = customerAddressService
    this.customerGroupService_ = customerGroupService
    this.customerGroupCustomerService_ = customerGroupCustomerService
  }

  __joinerConfig(): ModuleJoinerConfig {
    return joinerConfig
  }

  // @ts-expect-error
  async createCustomers(
    data: CustomerTypes.CreateCustomerDTO,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerDTO>

  async createCustomers(
    data: CustomerTypes.CreateCustomerDTO[],
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerDTO[]>

  @InjectManager()
  async createCustomers(
    dataOrArray:
      | CustomerTypes.CreateCustomerDTO
      | CustomerTypes.CreateCustomerDTO[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<CustomerTypes.CustomerDTO | CustomerTypes.CustomerDTO[]> {
    const customers = await this.createCustomers_(dataOrArray, sharedContext)

    const serialized = await this.baseRepository_.serialize<
      CustomerTypes.CustomerDTO[]
    >(customers, {
      populate: true,
    })

    return Array.isArray(dataOrArray) ? serialized : serialized[0]
  }

  @InjectTransactionManager()
  async createCustomers_(
    dataOrArray:
      | CustomerTypes.CreateCustomerDTO
      | CustomerTypes.CreateCustomerDTO[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<CustomerTypes.CustomerDTO[]> {
    const data = Array.isArray(dataOrArray) ? dataOrArray : [dataOrArray]
    const customerAttributes = data.map(({ addresses, ...rest }) => {
      return rest
    })

    const customers = await this.customerService_.create(
      customerAttributes,
      sharedContext
    )

    const addressDataWithCustomerIds = data
      .map(({ addresses }, i) => {
        if (!addresses) {
          return []
        }

        return addresses.map((address) => ({
          ...address,
          customer_id: customers[i].id,
        }))
      })
      .flat()

    await this.createCustomerAddresses(
      addressDataWithCustomerIds,
      sharedContext
    )

    return customers as unknown as CustomerTypes.CustomerDTO[]
  }

  // @ts-expect-error
  updateCustomers(
    customerId: string,
    data: CustomerTypes.CustomerUpdatableFields,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerDTO>
  // @ts-expect-error
  updateCustomers(
    customerIds: string[],
    data: CustomerTypes.CustomerUpdatableFields,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerDTO[]>
  // @ts-expect-error
  updateCustomers(
    selector: CustomerTypes.FilterableCustomerProps,
    data: CustomerTypes.CustomerUpdatableFields,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerDTO[]>

  @InjectTransactionManager()
  // @ts-expect-error
  async updateCustomers(
    idsOrSelector: string | string[] | CustomerTypes.FilterableCustomerProps,
    data: CustomerTypes.CustomerUpdatableFields,
    @MedusaContext() sharedContext: Context = {}
  ) {
    let updateData:
      | CustomerTypes.UpdateCustomerDTO
      | CustomerTypes.UpdateCustomerDTO[]
      | {
          selector: CustomerTypes.FilterableCustomerProps
          data: CustomerTypes.CustomerUpdatableFields
        }

    if (isString(idsOrSelector)) {
      updateData = {
        id: idsOrSelector,
        ...data,
      }
    } else if (Array.isArray(idsOrSelector)) {
      updateData = idsOrSelector.map((id) => ({
        id,
        ...data,
      }))
    } else {
      updateData = {
        selector: idsOrSelector,
        data: data,
      }
    }

    const customers = await this.customerService_.update(
      updateData,
      sharedContext
    )

    const serialized = await this.baseRepository_.serialize<
      CustomerTypes.CustomerDTO | CustomerTypes.CustomerDTO[]
    >(customers, {
      populate: true,
    })

    return serialized
  }

  // @ts-expect-error
  async createCustomerGroups(
    dataOrArrayOfData: CustomerTypes.CreateCustomerGroupDTO,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerGroupDTO>

  // @ts-expect-error
  async createCustomerGroups(
    dataOrArrayOfData: CustomerTypes.CreateCustomerGroupDTO[],
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerGroupDTO[]>

  @InjectTransactionManager()
  // @ts-expect-error
  async createCustomerGroups(
    dataOrArrayOfData:
      | CustomerTypes.CreateCustomerGroupDTO
      | CustomerTypes.CreateCustomerGroupDTO[],
    @MedusaContext() sharedContext: Context = {}
  ) {
    const groups = await this.customerGroupService_.create(
      dataOrArrayOfData,
      sharedContext
    )

    return await this.baseRepository_.serialize<
      CustomerTypes.CustomerGroupDTO | CustomerTypes.CustomerGroupDTO[]
    >(groups, {
      populate: true,
    })
  }

  // @ts-expect-error
  async updateCustomerGroups(
    groupId: string,
    data: CustomerTypes.CustomerGroupUpdatableFields,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerGroupDTO>
  // @ts-expect-error
  async updateCustomerGroups(
    groupIds: string[],
    data: CustomerTypes.CustomerGroupUpdatableFields,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerGroupDTO[]>
  // @ts-expect-error
  async updateCustomerGroups(
    selector: CustomerTypes.FilterableCustomerGroupProps,
    data: CustomerTypes.CustomerGroupUpdatableFields,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerGroupDTO[]>

  @InjectTransactionManager()
  // @ts-expect-error
  async updateCustomerGroups(
    groupIdOrSelector:
      | string
      | string[]
      | CustomerTypes.FilterableCustomerGroupProps,
    data: CustomerTypes.CustomerGroupUpdatableFields,
    @MedusaContext() sharedContext: Context = {}
  ) {
    let updateData:
      | CustomerTypes.UpdateCustomerGroupDTO
      | CustomerTypes.UpdateCustomerGroupDTO[]
      | {
          selector: CustomerTypes.FilterableCustomerGroupProps
          data: CustomerTypes.CustomerGroupUpdatableFields
        }

    if (isString(groupIdOrSelector) || Array.isArray(groupIdOrSelector)) {
      const groupIdOrSelectorArray = Array.isArray(groupIdOrSelector)
        ? groupIdOrSelector
        : [groupIdOrSelector]
      updateData = groupIdOrSelectorArray.map((id) => ({
        id,
        ...data,
      }))
    } else {
      updateData = {
        selector: groupIdOrSelector,
        data: data,
      }
    }

    const groups = await this.customerGroupService_.update(
      updateData,
      sharedContext
    )

    if (isString(groupIdOrSelector)) {
      return await this.baseRepository_.serialize<CustomerTypes.CustomerGroupDTO>(
        groups[0],
        { populate: true }
      )
    }

    return await this.baseRepository_.serialize<
      CustomerTypes.CustomerGroupDTO[]
    >(groups, { populate: true })
  }

  async addCustomerToGroup(
    groupCustomerPair: CustomerTypes.GroupCustomerPair,
    sharedContext?: Context
  ): Promise<{ id: string }>

  async addCustomerToGroup(
    groupCustomerPairs: CustomerTypes.GroupCustomerPair[],
    sharedContext?: Context
  ): Promise<{ id: string }[]>

  @InjectTransactionManager()
  async addCustomerToGroup(
    data: CustomerTypes.GroupCustomerPair | CustomerTypes.GroupCustomerPair[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<{ id: string } | { id: string }[]> {
    const groupCustomers = await this.customerGroupCustomerService_.create(
      data,
      sharedContext
    )

    if (Array.isArray(data)) {
      return (
        groupCustomers as unknown as InferEntityType<
          typeof CustomerGroupCustomer
        >[]
      ).map((gc) => ({ id: gc.id }))
    }

    return { id: groupCustomers.id }
  }

  // @ts-expect-error
  async createCustomerAddresses(
    addresses: CustomerTypes.CreateCustomerAddressDTO[],
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerAddressDTO[]>
  // @ts-expect-error
  async createCustomerAddresses(
    address: CustomerTypes.CreateCustomerAddressDTO,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerAddressDTO>

  @InjectManager()
  // @ts-expect-error
  async createCustomerAddresses(
    data:
      | CustomerTypes.CreateCustomerAddressDTO
      | CustomerTypes.CreateCustomerAddressDTO[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<
    CustomerTypes.CustomerAddressDTO | CustomerTypes.CustomerAddressDTO[]
  > {
    const addresses = await this.createCustomerAddresses_(data, sharedContext)

    const serialized = await this.baseRepository_.serialize<
      CustomerTypes.CustomerAddressDTO[]
    >(addresses, { populate: true })

    if (Array.isArray(data)) {
      return serialized
    }

    return serialized[0]
  }

  @InjectTransactionManager()
  private async createCustomerAddresses_(
    data:
      | CustomerTypes.CreateCustomerAddressDTO
      | CustomerTypes.CreateCustomerAddressDTO[],
    @MedusaContext() sharedContext: Context = {}
  ) {
    return await this.customerAddressService_.create(
      Array.isArray(data) ? data : [data],
      sharedContext
    )
  }

  // @ts-expect-error
  async updateCustomerAddresses(
    addressId: string,
    data: CustomerTypes.UpdateCustomerAddressDTO,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerAddressDTO>
  // @ts-expect-error
  async updateCustomerAddresses(
    addressIds: string[],
    data: CustomerTypes.UpdateCustomerAddressDTO,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerAddressDTO[]>
  // @ts-expect-error
  async updateCustomerAddresses(
    selector: CustomerTypes.FilterableCustomerAddressProps,
    data: CustomerTypes.UpdateCustomerAddressDTO,
    sharedContext?: Context
  ): Promise<CustomerTypes.CustomerAddressDTO[]>

  @InjectTransactionManager()
  // @ts-expect-error
  async updateCustomerAddresses(
    addressIdOrSelector:
      | string
      | string[]
      | CustomerTypes.FilterableCustomerAddressProps,
    data: CustomerTypes.UpdateCustomerAddressDTO,
    @MedusaContext() sharedContext: Context = {}
  ) {
    let updateData:
      | CustomerTypes.UpdateCustomerAddressDTO[]
      | {
          selector: CustomerTypes.FilterableCustomerAddressProps
          data: CustomerTypes.UpdateCustomerAddressDTO
        }
    if (isString(addressIdOrSelector)) {
      updateData = [
        {
          id: addressIdOrSelector,
          ...data,
        },
      ]
    } else if (Array.isArray(addressIdOrSelector)) {
      updateData = addressIdOrSelector.map((id) => ({
        id,
        ...data,
      }))
    } else {
      updateData = {
        selector: addressIdOrSelector,
        data,
      }
    }

    const addresses = await this.customerAddressService_.update(
      updateData,
      sharedContext
    )

    await this.flush(sharedContext)

    const serialized = await this.baseRepository_.serialize<
      CustomerTypes.CustomerAddressDTO[]
    >(addresses, { populate: true })

    if (isString(addressIdOrSelector)) {
      return serialized[0]
    }

    return serialized
  }

  async removeCustomerFromGroup(
    groupCustomerPair: CustomerTypes.GroupCustomerPair,
    sharedContext?: Context
  ): Promise<void>
  async removeCustomerFromGroup(
    groupCustomerPairs: CustomerTypes.GroupCustomerPair[],
    sharedContext?: Context
  ): Promise<void>

  @InjectTransactionManager()
  async removeCustomerFromGroup(
    data: CustomerTypes.GroupCustomerPair | CustomerTypes.GroupCustomerPair[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<void> {
    const pairs = Array.isArray(data) ? data : [data]
    const groupCustomers = await this.customerGroupCustomerService_.list({
      $or: pairs,
    })
    await this.customerGroupCustomerService_.delete(
      groupCustomers.map((gc) => gc.id),
      sharedContext
    )
  }

  private async flush(context: Context) {
    const em = (context.manager ?? context.transactionManager) as EntityManager
    await em.flush()
  }
}

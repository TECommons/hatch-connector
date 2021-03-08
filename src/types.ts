import { SubscriptionHandler } from '@aragon/connect-core'
import Contribution from './models/Contribution'
import Contributor from './models/Contributor'
import GeneralConfig from './models/GeneralConfig'

/**
 * Pending
 * Funding
 * Refunding
 * GoalReached
 * Closed
 */
export const HATCH_STATES = [0, 1, 2, 3, 4]

export type SubscriptionCallback<T> = (error: Error | null, data?: T) => void

export interface TokenData {
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface HatchOracleConfigData {
  id: string
  scoreToken: TokenData
  ratio: number
}

export interface HatchConfigData {
  id: string
  token: TokenData
  reserve: string
  beneficiary: string
  contributionToken: TokenData
  minGoal: string
  maxGoal: string
  period: number
  exchangeRate: string
  vestingCliffPeriod: number
  vestingCompletePeriod: number
  supplyOfferedPct: string
  fundingForBeneficiaryPct: string
  openDate: string
  vestingCliffDate: number
  vestingCompleteDate: number
  totalRaised: string
  state: string
}

export interface GeneralConfigData {
  id: string
  hatch: HatchConfigData
  hatchOracle: HatchOracleConfigData
}

export interface ContributorData {
  id: string
  account: string
  totalAmount: string
  totalValue: string
}

export interface ContributionData {
  id: string
  contributorId: string
  value: string
  amount: string
  vestedPurchaseId: string
  createdAt: string
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IHatchConnector {
  disconnect(): Promise<void>
  generalConfig(orgAddress: string): Promise<GeneralConfig>
  onGeneralConfig(
    orgAddress: string,
    callback: SubscriptionCallback<GeneralConfig>
  ): SubscriptionHandler
  contributors(
    appAddress: string,
    first: number,
    skip: number,
    orderBy: string,
    orderDirection: string
  ): Promise<Contributor[]>
  onContributors(
    appAddress: string,
    first: number,
    skip: number,
    orderBy: string,
    orderDirection: string,
    callback: SubscriptionCallback<Contributor[]>
  ): SubscriptionHandler
  contributor(id: string): Promise<Contributor>
  onContributor(
    id: string,
    callback: SubscriptionCallback<Contributor>
  ): SubscriptionHandler
  contributions(
    appAddress: string,
    contributor: string,
    first: number,
    skip: number,
    orderBy: string,
    orderDirection: string
  ): Promise<Contribution[]>
  onContributions(
    appAddress: string,
    contributor: string,
    first: number,
    skip: number,
    orderBy: string,
    orderDirection: string,
    callback: SubscriptionCallback<Contribution[]>
  ): SubscriptionHandler
}

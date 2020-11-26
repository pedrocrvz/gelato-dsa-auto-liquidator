import React, { FC, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Card, CardContent, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import useSharedState from 'hooks/useSharedState'
import useSigner from 'hooks/useSigner'

import * as dsaSdk from 'dsa-sdk'
import Web3 from 'web3'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    flexGrow: 1,
  },
}))

interface HeaderProps {
  balance: string
  dsaBalance: string
  ethPrice: string
  blockNumber: string
}

export const getDSAInstance = async (userAddress: string): Promise<any> => {
  const dsa = new dsaSdk(new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/')))
  const accounts = await dsa.getAccounts(userAddress)
  dsa.setInstance(accounts[0].id)
  return dsa
}

const Header: FC<HeaderProps> = ({ balance, dsaBalance, ethPrice, blockNumber }) => {
  const classes = useStyles()
  const [vault, setVault] = useState<any>()
  const { vaultId, dsaAddress } = useSharedState()
  const { address: userAddress } = useSigner()

  useEffect(() => {
    const getVaultInfo = async (dsaAddress) => {
      try {
        const dsaInstance = await getDSAInstance(userAddress)
        const vaults = await dsaInstance.maker.getVaults(dsaAddress)
        setVault(vaults[vaultId])
      } catch (error) {}
    }

    if (dsaAddress && vaultId) getVaultInfo(dsaAddress)
  }, [vaultId])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            color="textSecondary"
            variant="h4"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            gutterBottom
          >
            Auto Liquidator Simulator
          </Typography>
          <Alert severity="warning" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            This is meant to simulate the automation of the auto liquidator task. To do that we mock a price action to
            activate and force gelato bots to execute the auto liquidation. Since only the oracle will be mocked, the
            "actual" ETH price will remain the same as the one in the current block - meaning the ETH - DAI exchange
            rate will not be same as the ETH price mocked. the task is simulated locally and not sent to Gelato network.
          </Alert>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Real ETH Price
              </Typography>
              <Typography variant="h5" component="h2">
                {Math.round(parseFloat(ethPrice))} $
              </Typography>
              <Typography color="textSecondary" variant="caption" gutterBottom>
                on block
              </Typography>
              <Typography variant="h6" component="h2">
                {blockNumber}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                DSA Balance
              </Typography>
              <Typography variant="h6" component="h2">
                {ethers.utils.formatUnits(ethers.BigNumber.from(dsaBalance ? dsaBalance : '0'), 18).slice(0, 6)} ETH
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Vault Collateral / Debt
              </Typography>
              <Typography variant="h6" component="h2">
                {vault ? vault.col : 0} ETH / {vault ? vault.debt : 0} DAI
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Your Balance
              </Typography>
              <Typography variant="h6" component="h2">
                {ethers.utils.formatUnits(ethers.BigNumber.from(balance ? balance : '0'), 18).slice(0, 6)} ETH
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Header

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getInnamedAccounts
}) => {

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    await deploy('AdriaTest', {
        from: deployer,
        contract: 'AdriaTest',
        args: [],
        log: true
    })

}

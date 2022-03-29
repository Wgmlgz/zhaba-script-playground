export const fetchFilesPaths = async (target_path: string) =>
  await Promise.all(
    (
      await (
        await fetch(
          (
            await (
              await fetch(
                'https://api.github.com/repos/wgmlgz/zhaba-script/git/trees/main'
              )
            ).json()
          ).tree.filter(({ path }: any) => path === target_path)[0].url
        )
      ).json()
    ).tree
  )

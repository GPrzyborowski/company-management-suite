import { useState } from 'react'
import HostPanel from './HostPanel'
import NewHostModal from './NewHostModal'
import classes from './ManagementViewport.module.css'

function ManagementViewport() {
  const [confirmVisible, setConfirmVisible] = useState(false)

  const openModal = () => setConfirmVisible(true)
  const closeModal = () => setConfirmVisible(false)

  return (
    <main className={classes.main}>
      <HostPanel className={classes.host} onNewHostClick={openModal} />

      <NewHostModal
        confirmVisible={confirmVisible}
        onCancel={closeModal}
      />
    </main>
  )
}

export default ManagementViewport
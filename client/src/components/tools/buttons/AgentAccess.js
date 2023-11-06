import React from 'react'

const AgentAccess = ({ handleAgentShow, agentButtonWidth, agentBackgroundColour, agentOtherColour }) => {

  return (
    <>
      <button className='agent-access' 
        onClick={handleAgentShow}
        style={{ width: agentButtonWidth, backgroundColor: agentBackgroundColour, border: `1px solid ${agentOtherColour}`, color: agentOtherColour  }}
      >Sign up for free</button>

    </>
  )
}

export default AgentAccess
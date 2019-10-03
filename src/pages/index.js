import React, { useState } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles.css"

const portalId = "6514515"
const formId = "9e8e7ed4-9f3a-43b0-9b30-9122b41d2ef3"

const IndexPage = () => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [planType, setPlanType] = useState("none")
  const [hasOptIn, setHasOptIn] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)

    axios
      .post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          portalId,
          formId,
          fields: [
            {
              name: "email",
              value: email,
            },
            {
              name: "firstname",
              value: firstName,
            },
            {
              name: "lastname",
              value: lastName,
            },
            {
              name: "plantype",
              value: planType,
            },
            {
              name: "has_opt_in",
              value: hasOptIn,
            },
          ],
        }
      )
      .then(function(response) {
        console.log(response)
        setIsLoading(false)
        setIsSent(true)
      })
  }

  return (
    <Layout>
      <SEO title="Home" />

      {isSent && (
        <p style={{ fontWeight: "bold", color: "green" }}>
          Form sent. Thank you!
        </p>
      )}

      {!isSent && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />

            <select
              name="planType"
              value={planType}
              onChange={e => setPlanType(e.target.value)}
            >
              <option value="none" disabled>
                Plan Type
              </option>
              <option value="Pro">Pro</option>
              <option value="Community">Community</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            <label>
              <input
                type="checkbox"
                name="hasOptIn"
                onChange={e => setHasOptIn(e.target.checked)}
                checked={hasOptIn}
              />
              Receive marketing communications
            </label>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending…" : "Send Form Data"}
            </button>
          </form>
          <pre>
            {JSON.stringify(
              {
                email,
                firstName,
                lastName,
                planType,
                hasOptIn,
              },
              null,
              2
            )}
          </pre>
        </>
      )}
    </Layout>
  )
}

export default IndexPage

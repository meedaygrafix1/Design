function Heading({ number, eyebrow, title, children }) {
    return (
        <div className="rv-section-heading">
            <p className="rv-eyebrow"><span>{number}</span> {eyebrow}</p>
            <h2>{title}</h2>
            <p className="rv-lead">{children}</p>
        </div>
    );
}

export default function RealvestAdminStory({ gallery }) {
    return (
        <>
            <section id="rva-overview" className="rv-section rv-overview">
                <p className="rv-eyebrow">The overview</p>
                <div>
                    <h2>The investment journey continues<br />on the other side of the screen.</h2>
                    <p>The RealVEST mobile app lets people invest in a share of a property. Behind that experience, a team has to verify investors, prepare property listings, match incoming payments, approve withdrawals, distribute income and answer questions when something goes wrong.</p>
                    <p>I designed RealVEST Admin as the workspace connecting those responsibilities. The challenge was to make detailed operational work understandable while keeping the consequences of each action visible. A staff member should be able to find a case, understand its history, decide what to do and see who needs to act next.</p>
                    <p>My work covered the staff onboarding journey, the structure of the workspace, the everyday review screens and the confirmation, recovery and permission states around them.</p>
                </div>
            </section>

            <section id="rva-problem" className="rv-section">
                <Heading number="01" eyebrow="The challenge" title="A simple customer action can create several operational decisions.">An investor sees a payment, a property or a withdrawal. The team sees identity evidence, transaction references, funding terms and approval responsibilities. I needed to connect those details without making every member of staff work through the entire system.</Heading>
                <div className="rv-problem-grid">
                    <article><span>Finding the work</span><h3>Totals do not explain what is stuck</h3><p>A growing investment total can sit beside an unresolved payment. The workspace needed to surface waiting cases and their age so staff could move from a business summary into a specific task.</p></article>
                    <article><span>Understanding the record</span><h3>One customer has several connected histories</h3><p>Identity checks, property holdings, wallet movements and support requests all help explain an account. Staff needed a way to follow those connections without losing the investor or transaction they started with.</p></article>
                    <article><span>Taking responsibility</span><h3>Access needs to match the decision</h3><p>Reviewing a document, preparing a payout and approving a correction require different responsibilities. I made those boundaries part of the experience, from the first invitation to the final confirmation.</p></article>
                </div>
                <div className="rv-design-question"><span className="rv-eyebrow">The design question</span><p>How can a team move from “something needs attention” to a clear, accountable resolution?</p></div>
            </section>

            <section id="rva-structure" className="rv-section">
                <Heading number="02" eyebrow="Organising the workspace" title="Build around the work people need to finish.">I grouped the product around the records staff handle and the decisions they make. The navigation provides stable places for those records, while related links connect an investor, a payment, a support case and its approval history.</Heading>
                <div className="rva-workspace-map">
                    <article><span>People & evidence</span><h3>Investors · Verification</h3><p>Understand the account, review identity evidence and request the information needed to move forward.</p></article>
                    <article><span>Properties & ownership</span><h3>Properties · Investments</h3><p>Prepare an offering, check its documents and terms, then follow the investment orders attached to it.</p></article>
                    <article><span>Money & resolution</span><h3>Transactions · Withdrawals · Distributions</h3><p>Follow money through its different states and investigate the records that need attention.</p></article>
                    <article><span>Responsibility & history</span><h3>Support · Approvals · Audit · Team</h3><p>Keep conversations connected to records, route decisions to the right person and preserve what happened.</p></article>
                </div>
                <div className="rv-approach"><h3>A consistent review pattern</h3><p>Across the workspace, I used the same progression: find the record, inspect the evidence, review the impact and take the next action. This gives a verification reviewer and a finance approver a familiar structure even though they are making different decisions.</p></div>
            </section>

            <section id="rva-onboarding" className="rv-section">
                <Heading number="03" eyebrow="Staff onboarding" title="Explain the role before opening the workspace.">The invitation is the first place to establish responsibility. I made the inviter, work email and assigned role visible before account creation. The onboarding sequence then moves through authentication setup and recovery codes before explaining what that role can do.</Heading>
                {gallery(['admin-invitation', 'admin-access'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Give the invitation context</h3><p>The new staff member can see who invited them and the role they are accepting. A visible step count explains their progress through setup, while the same layout carries them from creating an account to entering the workspace.</p></article>
                    <article><h3>Translate permissions into everyday tasks</h3><p>The final step explains an operations analyst’s access in plain language: review investor records, review verification applications and prepare property updates. Payouts, financial settings and team permissions are listed separately, with a route to the administrator if different access is needed.</p></article>
                </div>
            </section>

            <section id="rva-overview-screen" className="rv-section">
                <Heading number="04" eyebrow="The daily overview" title="Turn the dashboard into a starting point for action.">I arranged the overview in three layers: the state of the business, the work needing attention and the latest investment activity. Staff can get their bearings, choose a queue and identify a recent transaction from the same screen.</Heading>
                {gallery(['admin'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Pair each queue with its waiting time</h3><p>The attention list shows unmatched payments, identity reviews, withdrawal exceptions and property publishing reviews. A count explains the volume; the age of the oldest item explains how long someone has been waiting. Each row leads into the relevant work.</p></article>
                    <article><h3>Give financial totals distinct meanings</h3><p>Settled investment capital, available wallet balances and pending withdrawals have separate labels and supporting text. Customer wallet money is identified as customer funds, while the investment total describes capital committed to properties. That distinction carries into the investor’s individual account.</p></article>
                </div>
            </section>

            <section id="rva-investors" className="rv-section">
                <Heading number="05" eyebrow="Investor context" title="Bring the account together before asking staff to act.">The investor profile is the reference point for understanding a customer. I brought account status, verification, holdings, cash and related records into one view so a staff member can establish the context before opening a transaction or support case.</Heading>
                {gallery(['admin-investor'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Separate ownership, cash and income</h3><p>The profile shows ₦1,000,000 invested across three holdings, ₦250,000 available as cash and ₦15,000 already received as income. The holdings table explains where the invested capital sits. This makes the account easier to interpret than a single combined balance.</p></article>
                    <article><h3>Keep follow-up work within reach</h3><p>Related records expose the open support ticket, latest transaction and assigned reviewer. Contact details are masked in the overview, and the activity link provides a route to the account’s history. Staff can move into a specific record while keeping the customer’s wider situation in view.</p></article>
                </div>
            </section>

            <section id="rva-verification" className="rv-section">
                <Heading number="06" eyebrow="Identity verification" title="Put the evidence beside the decision.">A reviewer needs more than an approval button. I placed submitted documents, personal details and the review checklist together, then gave the reviewer distinct ways to approve, request information or escalate the case.</Heading>
                {gallery(['admin-verification', 'admin-correction'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Make the review criteria visible</h3><p>Document readability, name consistency, face comparison and duplicate checks are listed individually. The reviewer can see what has been checked and open the supporting document or live photo. This keeps the decision connected to the evidence behind it.</p></article>
                    <article><h3>Turn a blocked case into a clear request</h3><p>When a passport image is unreadable, the correction screen names the problem and asks for a clearer photo with all four corners visible and no reflections. It also shows the case changing from “Under review” to “Needs information.” The customer receives a specific instruction, and the team can see why the case is waiting.</p></article>
                </div>
            </section>

            <section id="rva-properties" className="rv-section">
                <Heading number="07" eyebrow="Property publishing" title="Make the offering reviewable before it reaches investors.">A property listing includes a financial offer as well as a building. I separated the setup into property basics, the offering and supporting documents, then brought them together in a publishing review for an independent approver.</Heading>
                {gallery(['admin-offering', 'admin-publishing'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Define the terms in one place</h3><p>The offering screen connects a ₦45 million funding target to 4,500 units priced at ₦10,000 each, with a minimum subscription of five units. The closing date, holding period and offering policy sit alongside those figures so the terms can be reviewed as a whole.</p></article>
                    <article><h3>Give publication its own decision point</h3><p>The publishing review summarises the property and terms version beside checks for title, valuation, offering documents and risk disclosures. It names the preparer and offers “Approve publication” or “Request changes.” Publication becomes an explicit review of a defined version of the offer.</p></article>
                </div>
            </section>

            <section id="rva-payments" className="rv-section">
                <Heading number="08" eyebrow="Payments & reconciliation" title="Follow the evidence from an incoming payment to a ledger entry.">A bank transfer can arrive without a matching customer credit. I designed the transaction ledger to surface those unmatched records, and the reconciliation workbench to put provider evidence beside a possible match.</Heading>
                {gallery(['admin-ledger', 'admin-reconciliation'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Make the unresolved record easy to find</h3><p>The ledger supports searching by reference, investor or provider ID, with filters for type and status. Deposits, investments and withdrawals retain their individual references. The unmatched ₦150,000 bank transfer has a direct “Reconcile” action, giving staff a clear route from the list into investigation.</p></article>
                    <article><h3>Compare before committing to a match</h3><p>The workbench shows the provider record, amount, sender, bank reference and receipt time alongside the suggested investor. It also checks whether a ledger credit already exists. Staff can keep the payment unresolved or submit the match for approval after reviewing the evidence.</p></article>
                </div>
                <div className="rv-approach"><h3>The decision behind the layout</h3><p>I kept the incoming payment and proposed match visible at the same time because choosing a customer is only part of the task. The reviewer also needs to establish that the amount and reference agree and that the payment has not already been credited.</p></div>
            </section>

            <section id="rva-withdrawals" className="rv-section">
                <Heading number="09" eyebrow="Withdrawal recovery" title="Explain where the money is when a transfer fails.">A failed bank transfer does not tell the team whether the reserved wallet money has returned. I gave the investigation screen separate provider and reversal states, then designed a completion screen that connects the failed withdrawal to its return.</Heading>
                {gallery(['admin-withdrawal', 'admin-reversal'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Keep the investigation tied to the original transfer</h3><p>The exception view shows a ₦50,000 transfer, its ₦100 fee and the full ₦50,100 wallet reservation. The provider reports “Failed,” while the reversal is still awaiting confirmation. Staff can refresh the provider status or escalate using the existing reference instead of starting a second transfer.</p></article>
                    <article><h3>Close the loop with an explicit return record</h3><p>The reconciled state shows the principal and fee returned, the total wallet credit, the provider confirmation and the person who reconciled it. The original withdrawal stays marked “Failed” while the linked reversal is “Complete,” preserving both parts of the history.</p></article>
                </div>
            </section>

            <section id="rva-distributions" className="rv-section">
                <Heading number="10" eyebrow="Income distributions" title="Make a batch understandable down to each investor’s share.">Distributing property income combines a batch-level decision with individual credits. I designed the approval view to explain the total, the allocation per unit and the recipient breakdown, then treated partial failure as a separate recovery task.</Heading>
                {gallery(['admin-distribution', 'admin-distribution-failure'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Connect the total to the calculation</h3><p>The review shows ₦1.2 million across 6,000 eligible units at ₦200 per unit. Each recipient row carries units, gross entitlement, deductions and net credit. The approver can review how the batch is allocated before authorising it.</p></article>
                    <article><h3>Isolate the item that still needs work</h3><p>When one ₦20,000 credit fails, the recovery screen keeps the ₦1.18 million completed total visible and identifies the affected investor. “Verify ledger” and “Investigate failed credit” focus attention on the unresolved item while preserving the completed credits.</p></article>
                </div>
            </section>

            <section id="rva-support" className="rv-section">
                <Heading number="11" eyebrow="Customer support" title="Keep the conversation connected to the transaction.">Support needs enough context to give a useful answer. I placed the ticket conversation beside the customer, related withdrawal, bank amount and provider status, with a direct link to open the transaction.</Heading>
                {gallery(['admin-support'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Separate the reply from internal coordination</h3><p>The conversation includes the customer’s question and a finance note explaining that the transfer is still processing. The reply editor and internal-note action are distinct, so the team can coordinate an investigation and prepare the customer’s response in the same place.</p></article>
                    <article><h3>Make the next step appropriate to the role</h3><p>Support can view status and escalate the case. Releasing or reversing money belongs to another role. I kept those boundaries visible beside the transaction context so an agent can understand the issue and route it without needing financial approval access.</p></article>
                </div>
            </section>

            <section id="rva-approvals" className="rv-section">
                <Heading number="12" eyebrow="Approvals & audit history" title="Show the consequence before the decision, and the record afterwards.">For actions that change money or published terms, I designed a review that names the preparer, explains the evidence and shows the impact. Audit details then preserve who acted, what changed and which record the decision belongs to.</Heading>
                {gallery(['admin-approval', 'admin-audit'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Make a correction’s impact concrete</h3><p>The adjustment review identifies the original deposit and duplicate ledger entry. It shows a proposed ₦100,000 debit changing available cash from ₦350,000 to ₦250,000, alongside the supporting evidence. Approval and posting have separate states, making it clear that the request is still pending and has not changed the balance.</p></article>
                    <article><h3>Preserve the explanation behind a change</h3><p>The audit event records the actor’s role at the time, the affected object, the previous and new states, the terms version and the approval reference. For a property moving from pending publication to published, the reviewer can follow that history back to the property and its preparer.</p></article>
                </div>
            </section>

            <section id="rva-permissions" className="rv-section">
                <Heading number="13" eyebrow="Team & permissions" title="Make access understandable at both role and person level.">The permissions matrix explains the rules across the team. The member detail explains how those rules apply to one person, alongside their authentication status, current session and assigned work.</Heading>
                {gallery(['permissions', 'admin-team'], { desktop: true })}
                <div className="rv-notes-row">
                    <article><h3>Separate preparation from approval</h3><p>The matrix places actions down the left and roles across the top. Verification, finance preparation and finance approval have distinct capabilities. The finance preparer can prepare a financial action, while the approver can review it; the table makes that handoff visible.</p></article>
                    <article><h3>Consider the work attached to an account</h3><p>The member detail shows six open assigned cases next to access controls. Before suspending access, the administrator is prompted to reassign the work and preserve the member’s historical audit events. Managing an account therefore includes the responsibilities that need to be handed over.</p></article>
                </div>
            </section>

            <section id="rva-reflection" className="rv-section">
                <Heading number="14" eyebrow="Outcome & reflection" title="A connected workspace for the people behind the investment.">The design connects staff onboarding, investor review, property publishing and money operations through a consistent structure. Each workflow gives the team a place to find the record, understand the evidence, take the appropriate action and follow its history.</Heading>
                <div className="rv-reflection-grid">
                    <div><h3>The most important design decision</h3><p>I made the intermediate states part of the main experience. A payment can be received but unmatched. A withdrawal can fail while its reversal is still pending. An adjustment can be approved before it is posted. Showing those distinctions gives staff a more precise explanation of what has happened and what remains to be done.</p></div>
                    <div><h3>What this project taught me</h3><p>Clarity in an admin product comes from connecting information to responsibility. A reference number helps someone find the right record; a before-and-after balance explains the effect of a correction; a named preparer and reviewer explain the handoff. I used those details to make the larger workflows easier to follow.</p></div>
                </div>
            </section>
        </>
    );
}

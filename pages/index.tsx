import $ from "@/utils/theme";

const Heading = $.heading.createComponent('div', {
    background: $.sheet,
    textAlign: "center",
    paddingTop: $.s5,
    paddingBottom: $.s4
});

export default function Home () {
    return (
        <>
            <Heading>
                <h1 {...$.title({
                    color: $.primary
                })}>Bank Wrapped 2023</h1>
                <p {...$.headline()}>🎁 Your year on HCB, wrapped</p>
            </Heading>
            <div className="container" style={{
                paddingTop: "var(--spacing-3)",
                paddingBottom: "var(--spacing-3)",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 'var(--spacing-3)'
            }}>
                <h3 className="eyebrow" style={{
                    margin: '0px'
                }}>Actions</h3>
                <button onClick={() => {
                    window.open('/run', 'Bank Wrapped 2023');
                }}>Run Bank Wrapped 2023 →</button>
                <button onClick={() => {
                    window.open('/data', 'Test Data');
                }}>View Testing Data →</button>
            </div>
        </>
    )
}

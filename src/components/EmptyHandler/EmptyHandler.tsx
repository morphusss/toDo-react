import "./EmptyHandler.css";

export function EmptyHandler() {
    return(
        <>
        <section className="w-full h-full flex justify-center items-center text-gray-400 text-[16px]">
            {"You have 0 tasks. Start to feel proud :)"}
        </section>
        </>
    )
}

import React, { useEffect,useRef,useState } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
/**
 * @param {Array} props.data - all table data.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the table.
 * @param {Function} props.setStateFun - The function to update the state for drag-and-drop data.
 * @param {string} [props.tableClass] - Custom CSS class for the table element.
 * @param {string} [props.tableDivClass] - Custom CSS class for the outer div element.
 * @param {Object} [props.isOverCss] - CSS styles applied when an item is being dragged over the drop area.
 * @param {boolean} props.isDragAndDrop - Flag to enable or disable drag-and-drop functionality.
 * @param {number} props.dataLength - The length of the data array to calculate target index during drag-and-drop.
 */

const MainTable = ({ data, children, setStateFun, tableClass, tableDivClass, isOverCss, isDragAndDrop, dataLength }) => {
    const [initialLoad, setInitialLoad] = useState(true);
    const [{ isOver }, drop] = useDrop({
        accept: "ITEM_TYPE",
        drop: (item, monitor) => handleDrop(item, monitor),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    // Ref to store previous data
    const prevDataRef = useRef();
    useEffect(() => {
        const storedIndexes = JSON.parse(localStorage.getItem('tableOrderIndexes')) || [];
        const dragIndexData = JSON.parse(localStorage.getItem('DragIndex')) || [];

            const indexMap = dragIndexData.reduce((acc, cur) => {
            acc[cur?.id] = cur?.targetIndex;
            return acc;
        }, {});
    
        const orderedFiles = data
            .map(item => {
                const targetIndex = indexMap[item?._id] !== undefined ? indexMap[item._id] : storedIndexes?.indexOf(item?._id);
                return {
                    ...item,
                    targetIndex: targetIndex >= 0 ? targetIndex : data?.indexOf(item)
                };
            })
            .sort((a, b) => a?.targetIndex - b?.targetIndex);
    
        if (initialLoad) {
            setStateFun(orderedFiles);
            setInitialLoad(false);
        } else {
            const prevData = prevDataRef.current;
            if (JSON.stringify(orderedFiles) !== JSON.stringify(prevData)) {
                setStateFun(orderedFiles);
            }
        }
        prevDataRef.current = orderedFiles;
    }, [data, initialLoad, setStateFun]);
    
    const handleDrop = (item, monitor) => {
        const { originalIndex, id } = item;
        const clientOffset = monitor.getClientOffset();
        const targetIndex = getTargetIndex(clientOffset);
        if (targetIndex === null || targetIndex === undefined || targetIndex < 0) {
            return;
        }
    
        let DragIndexData = JSON.parse(localStorage.getItem('DragIndex')) || [];

        DragIndexData = DragIndexData.filter(data => data?.id !== id);

        DragIndexData.push({ ...item, targetIndex: targetIndex - 1 });
        localStorage.setItem('DragIndex', JSON.stringify(DragIndexData));
        setStateFun(prevFiles => {
            const updatedFiles = [...prevFiles];
            const [movedItem] = updatedFiles?.splice(originalIndex, 1);
            updatedFiles.splice(targetIndex, 0, movedItem);
            const newIndexes = updatedFiles.map(item => item?._id);
            localStorage.setItem('tableOrderIndexes', JSON.stringify(newIndexes));
            return updatedFiles;
        });
    };
    

    const getTargetIndex = (clientOffset) => {
        const rect = document.querySelector(".dragTable").getBoundingClientRect();
        const itemHeight = rect.height / dataLength;
        const dropY = clientOffset.y - rect.top;
        const targetIndex = Math.floor(dropY / itemHeight);
        return Math.max(0, Math.min(dataLength - 1, targetIndex));
    };

    return (
        <div
            ref={isDragAndDrop === "true" ? drop : null}
            className={`dragTable ${tableDivClass}`}
            style={{
                padding: isOverCss?.padding,
                backgroundColor: isOver ? isOverCss?.backgroundColor : "",
            }}
        >
            <table className={tableClass}>
                {children}
            </table>
        </div>
    );
};


MainTable.propTypes = {
    children: PropTypes.node.isRequired,
    setStateFun: PropTypes.func.isRequired,
    tableClass: PropTypes.string,
    tableDivClass: PropTypes.string,
    isOverCss: PropTypes.object,
    isDragAndDrop: PropTypes.bool.isRequired,
    dataLength: PropTypes.number.isRequired,
};

export default MainTable;

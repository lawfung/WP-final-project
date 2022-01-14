import { createContext, useContext, useState } from 'react';

const DeletedTagContext = createContext({
    deletedTag: false,
    changeDeletedTag: () => {},
});

const DeletedTagProvider = (props) => {
    const [deletedTag, setDeletedTag] = useState(false);
    const changeDeletedTag = (tag) => {
        setDeletedTag(tag => !tag);
    };
    return ( 
        <DeletedTagContext.Provider
            value={{
                deletedTag,
                changeDeletedTag,
            }}
            {...props}
        />
    );
};

function useDeletedTag () {
    return useContext(DeletedTagContext);
}

export { DeletedTagProvider, useDeletedTag };


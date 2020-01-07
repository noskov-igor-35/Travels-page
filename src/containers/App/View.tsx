import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateFulters, changeData } from '../../actions/data';
import { IViewProps } from '../../interfaces/containers/IView';
import Table from '../../components/Table';
import Indicator from '../../components/Indicator';

class View extends React.Component<IViewProps> {
    constructor(props: IViewProps) {
        super(props);
        this.state = {
            data: null
        }
    }

    // Метод загрщуки данных, предпологаем что они могут меняться
    getData(filter: string, sorting: string, page: number): void {
        // Сбросим данные и запомним актуальные фильтры
        this.props.updateDate({
            filter,
            sorting,
            page
        })

        // Запросим новые данные
        this.props.changeData({
            filter,
            sorting,
            page
        });
    }

    render(): JSX.Element {
        const { data } = this.props;
        const view = data ? <Table data={ data }/> : <Indicator/>
        return (
            <div>
                { view }
            </div>
        );
    }

    componentDidMount(): void {
        this.getData(this.props.filter, this.props.sorting, this.props.page);
    }

    componentDidUpdate(prevProps) {
        const {filter, sorting, page} = this.props;
        if (prevProps.filter !== filter || prevProps.sorting !== sorting || prevProps.page !== page) {
            this.getData(filter, sorting, page);
        }
    }
}

export default connect(
    state => ({
        ...state.filters,
        ...state.data,
    }),
    dispatch => ({
        updateDate: bindActionCreators(updateFulters, dispatch),
        changeData: bindActionCreators(changeData, dispatch),
    })
)(View);

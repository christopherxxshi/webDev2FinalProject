import React, { Component } from 'react';

class Java extends Component {
    constructor(props) {
        super(props);
        this.state = {
            java: []
        }
    }

    componentDidMount() {
        this.getJava();
    }

    getJava = async () => {
        try {
            const result = await fetch('api/question/language/1');
            this.setState({
                java: result.data,
            });
        } catch (error) {
            this.setState({
                error
            });
        }
    }
    render() {
        const { javaQuestions } = this.state.java;
        return (

            <div>
                <h1>
                    List of Questions
                </h1>

                {javaQuestions.length? (
                    <div>
                        {javaQuestions.map((item) => {
                            return (
                                <div>
                                    {item}
                                </div>
                            );
                    })}
                    </div>
                ): (
                    <div>
                      <h2>No Java Questions Found</h2>
                    </div>
                  ) }

            </div>
        )
    }

}

export default Java;
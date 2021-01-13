import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";

function Infobox({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                {/* Title - Coronavirus Cases / Recovered / Deaths */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of Cases */}
                <h2 className="infoBox__cases"> {cases} </h2>

                {/* Total cases */}
                <Typography className="infoBox__total">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default Infobox
